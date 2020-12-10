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
          content.changed_at = item[:changed_at]
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
      url = content_link stream.url, content.original_filename
      content_blob = fetch_content_blob url
      return to_result content, :error, "Failed to fetch content from #{url}" unless content_blob
      handle_save content, status, :scap_file => content_blob
    end

    def content_link(base_url, content_name)
      [base_url, content_name].join('/')
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
      parse_links response.body
    end

    def fetch_content_blob(url)
      response = fetch url
      return unless response.code == 200
      response.body
    end

    def fetch(url)
      RestClient.get(url)
    end

    def parse_links(html)
      items = html.scan entry_regex
      items.map do |item|
        begin
          { :filename => item.first, :changed_at => DateTime.parse(item.last) }
        rescue ArgumentError => e
          nil
        end
      end.compact
    end

    private

    def new_content(item, stream_id)
      OvalContent.new(:name => item[:filename], :original_filename => item[:filename], :content_stream_id => stream_id, :changed_at => item[:changed_at])
    end

    def entry_regex
      %r[<td><a href="(\S+)">.+</a></td><td\s*\S+>(\d{2}-\w{3}-\w{4}\s\d{2}:\d{2})\s*</td>]
    end
  end
end
