module ForemanOpenscap
  class ContentStreamSync
    def list(stream)
      { :results => fetch_content_list(stream.url) }
    end

    def check(stream)
      result = collect_content_diff stream
      { :results => result.transform_values { |ary| ary.map(&:to_h) } }
    end

    def collect_content_diff(stream)
      items = fetch_content_list stream.url

      items = items.take 2

      filenames = items.pluck(:filename)
      existing = OvalContent.where :original_filename => filenames, :content_stream_id => stream.id
      existing_filenames = existing.pluck(:original_filename)
      to_create = items.reject { |item| existing_filenames.include? item[:filename] }.map { |item| new_content item[:filename], stream.id }
      to_delete = OvalContent.where(:content_stream_id => stream.id).where.not :id => existing.pluck(:id)

      # to_delete = existing.where(:content_stream_id => stream.id).where.not :original_filename => filenames

      partition_existing(existing, items).merge(:delete => to_delete, :create => to_create)
    end

    def partition_existing(existing, items)
      existing.reduce({ :update => [], :skip => [] }) do |memo, content|
        item = items.find { |hash| hash[:filename] == content.original_filename }
        if content.changed_at < item[:changed_at]
          memo[:update] << content
        else
          memo[:skip] << content
        end
        memo
      end
    end

    def sync(stream)
      items = fetch_content_list stream.url

      items = items.take 2

      existing = OvalContent.where :original_filename => items.pluck(:filename), :content_stream_id => stream.id
      to_delete = OvalContent.where(:content_stream_id => stream.id).where.not :id => existing.pluck(:id)

      binding.pry

      updated_or_created = items.map { |item| create_or_update(stream, item, existing) }
      deleted = to_delete.map { |record| destroy record }
      { :results => deleted + updated_or_created }
    end

    def create_or_update(stream, item, existing)
      content = existing.find_by :original_filename => item[:filename], :content_stream_id => stream.id
      if content && content.changed_at < item[:changed_at]
        return apply_changes content, stream, item, :updated
      elsif !content
        return apply_changes new_content(item[:filename], stream.id), stream, item, :created
      end
      to_result content, :skipped
    end

    def new_content(filename, stream_id)
      OvalContent.new(:name => filename, :original_filename => filename, :content_stream_id => stream_id)
    end

    def apply_changes(content, stream, item, status, additional_params = {})
      url = content_link stream.url, item[:filename]
      content_blob = fetch_content_blob url
      return to_result content, :error, "Failed to fetch content from #{url}" unless content_blob
      handle_save content, status, { :scap_file => content_blob, :changed_at => item[:changed_at] }#.merge(additional_params)
    end

    def destroy(content)
      if content.destroy
        to_result content, :deleted
      else
        to_result content, :error, content.errors.full_messages
      end
    end

    def content_link(base_url, content_name)
      [base_url, content_name].join('/')
    end

    def fetch_content_blob(url)
      response = RestClient.get(url)
      return unless response.code == 200
      response.body
    end

    def to_result(resource, status, error_msg = nil)
      { :resource => resource.to_h, :status => status, :error => error_msg}
    end

    def handle_save(content, status, attrs)
      content.assign_attributes attrs
      if content.save
        to_result content, status
      else
        to_result content, :error, content.errors.full_messages
      end
    end

    def fetch_content_list(url)
      response = RestClient.get(url)
      return { :error => "Failed to reach a Content Stream with url #{url}" } unless response.code == 200
      parse_links response.body
    end

    def parse_links(html)
      items = html.scan entry_regex
      items.map do |item|
        begin
          { :filename => item.first, :changed_at => DateTime.parse(item.last) }
        rescue ArgumentError => e
          raise 'Well, whale...'
          nil
        end
      end
    end

    def entry_regex
      /<td><a href="(\S+)">.+<\/a><\/td><td\s*\S+>(\d{2}-\w{3}-\w{4}\s\d{2}:\d{2})\s*<\/td>/
    end
  end
end
