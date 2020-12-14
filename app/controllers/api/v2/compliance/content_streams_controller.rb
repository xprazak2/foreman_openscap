module Api::V2
  module Compliance
    class ContentStreamsController < ::Api::V2::BaseController
      include Foreman::Controller::Parameters::ContentStream
      include ForemanOpenscap::Api::V2::ScapApiControllerExtensions

      before_action :find_resource, :except => %w[index create]

      api :GET, '/compliance/content_streams', N_('List Content Streams')
      param_group :search_and_pagination, ::Api::V2::BaseController

      def index
        @content_streams = resource_scope_for_index(:permission => :view_content_streams)
      end

      api :GET, '/compliance/content_streams/:id', N_('Show a Content Stream')
      param :id, :identifier, :required => true

      def show
      end

      def_param_group :content_stream do
        param :content_stream, Hash, :required => true, :action_aware => true do
          param :name, String, :required => true, :desc => N_('Content Stream name')
          param :url, File, :required => true, :desc => N_('Source URL of a Content Stream')
          param_group :taxonomies, ::Api::V2::BaseController
        end
      end

      api :POST, '/compliance/content_streams', N_('Create Content Stream')
      param_group :content_stream, :as => :create

      def create
        @content_stream = ForemanOpenscap::ContentStream.new(content_stream_params)
        process_response @content_stream.save
      end

      api :PUT, '/compliance/content_streams/:id', N_('Update a Content Stream')
      param :id, :identifier, :required => true
      param_group :content_stream

      def update
        process_response @content_stream.update(content_stream_params)
      end

      api :DELETE, '/compliance/content_streams/:id', N_('Delete a Content Stream')
      param :id, :identifier, :required => true

      def destroy
        process_response @content_stream.destroy
      end

      api :POST, '/compliance/content_stream/:id/sync', N_('Sync a Content Stream')
      param :id, :identifier, :required => true
      def sync
        res = @content_stream.sync
        binding.pry
        render :json => res
      end

      api :GET, '/compliance/content_stream/:id/list', N_('List files in a Content Stream')
      param :id, :identifier, :required => true
      def list
        res = @content_stream.list
        binding.pry
        render :json => res
      end

      api :POST, '/compliance/content_stream/:id/check', N_('Check for changes in a Content Stream')
      param :id, :identifier, :required => true
      def check
        res = @content_stream.check
        render :json => res
      end

      def action_permission
        case params[:action]
        when 'list', 'check'
          :view
        else
          super
        end
      end
    end
  end
end
