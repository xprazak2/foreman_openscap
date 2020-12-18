module ForemanOpenscap
  class ContentStreamSync
    def list(stream)
      { :results => fetch_content_list(stream.url) }
    end

    def check(stream)
      content_diff = collect_content_diff stream
      { :results => content_diff.transform_values { |ary| ary.map(&:to_h) } }
    end

    def collect_content_diff(stream)
      items = fetch_content_list stream.url

      filenames = items.pluck(:filename)
      existing = OvalContent.where :original_filename => filenames, :content_stream_id => stream.id
      existing_filenames = existing.pluck(:original_filename)
      to_create = items.reject { |item| existing_filenames.include? item[:filename] }.map { |item| new_content item, stream.id }
      to_delete = OvalContent.where(:content_stream_id => stream.id).where.not :id => existing.pluck(:id)

      partition_existing(existing, items).merge(:delete => to_delete, :create => to_create)
    end

    def partition_existing(existing, items)
      existing.reduce(:update => [], :skip => []) do |memo, content|
        item = items.find { |hash| hash[:filename] == content.original_filename }
        if content.changed_at < item[:changed_at]
          content.assign_attributes(:changed_at => item[:changed_at], :src => item[:src])
          memo[:update] << content
        else
          memo[:skip] << content
        end
        memo
      end
    end

    def sync(stream)
      content_diff = collect_content_diff stream
      deleted_results = content_diff[:delete].map { |record| handle_destroy record }
      updated_results = content_diff[:update].map { |record| apply_changes record, stream, :updated }
      created_results = content_diff[:create].map { |record| apply_changes record, stream, :created }
      skipped_results = content_diff[:skip].map { |res| to_result res, :skipped }
      { :results => deleted_results + updated_results + created_results + skipped_results }
    end

    def apply_changes(content, stream, status)
      content_blob = fetch_content_blob content.src
      return to_result content, :error, "Failed to fetch content from #{content.src}" unless content_blob
      handle_save content, status, :scap_file => content_blob
    end

    def to_result(resource, status, error_msg = nil)
      { :resource => resource.to_h, :status => status, :error => error_msg }
    end

    def handle_save(content, status, attrs)
      content.assign_attributes attrs
      if content.save
        to_result content, status
      else
        to_result content, :error, content.errors.full_messages
      end
    end

    def handle_destroy(content)
      if content.destroy
        to_result content, :deleted
      else
        to_result content, :error, content.errors.full_messages
      end
    end

    def fetch_content_list(url)
      response = fetch url
      return { :error => "Failed to reach a Content Stream with url #{url}" } unless response.code == 200

      begin
        hash = JSON.parse(response.body)
      rescue JSON::ParserError => e
        return { :error => "Failed to parse feed.json in a Content Stream with url #{url}" }
      end
      parse_items hash
    end

    def fetch_content_blob(url)
      response = fetch url
      return unless response.code == 200
      response.body
    end

    def fetch(url)
      RestClient.get(url)
    end

    def parse_items(hash)
      (hash.dig('feed', 'entry') || []).map { |entry| parse_item entry }.compact
    end

    def parse_item(item)
      begin
        { :filename => item['id'], :changed_at => DateTime.parse(item['updated']), :src => item.dig('content', 'src') }
      rescue ArgumentError => e
        nil
      end
    end

    private

    def new_content(item, stream_id)
      OvalContent.new(:name => item[:filename], :original_filename => item[:filename], :content_stream_id => stream_id, :changed_at => item[:changed_at], :src => item[:src])
    end
  end
end
