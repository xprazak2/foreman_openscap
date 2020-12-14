module ForemanOpenscap
  class ContentStream < ApplicationRecord
    include Authorizable
    include Taxonomix

    validates :name, :presence => true, :uniqueness => true
    validates :url, :presence => true

    has_many :oval_contents

    # resource_class_for(resource_name)

    def sync
      content_stream_sync.sync self
    end

    def list
      content_stream_sync.list self
    end

    def check
      content_stream_sync.check self
    end

    def content_stream_sync
      @content_stream_sync ||= ContentStreamSync.new
    end
  end
end
