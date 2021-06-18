module Api::V2
  module Compliance
    class OvalContentsController < ::Api::V2::BaseController
      include Foreman::Controller::Parameters::OvalContent
      include ForemanOpenscap::Api::V2::ScapApiControllerExtensions

      before_action :find_resource, :except => %w[index create sync]
      skip_before_action :check_media_type, :only => %w[create update]

      api :GET, '/compliance/oval_contents', N_('List OVAL contents')
      param_group :search_and_pagination, ::Api::V2::BaseController
      add_scoped_search_description_for(::ForemanOpenscap::OvalContent)

      def index
        @oval_contents = resource_scope_for_index(:permission => :view_oval_contents)
      end

      api :GET, '/compliance/oval_contents/:id', N_('Show an OVAL content')
      param :id, :identifier, :required => true

      def show
      end

      def_param_group :oval_content do
        param :oval_content, Hash, :required => true, :action_aware => true do
          param :name, String, :required => true, :desc => N_('OVAL content name')
          param :scap_file, File, :desc => N_('XML containing OVAL content')
          param :original_filename, String, :desc => N_('Original file name of the OVAL content file')
          param :url, String, :desc => N_('URL of the OVAL content file')
          param_group :taxonomies, ::Api::V2::BaseController
        end
      end

      api :POST, '/compliance/oval_contents', N_('Create OVAL content')
      param_group :oval_content, :as => :create

      def create
        require 'pry-byebug'
        binding.pry
        @oval_content = ForemanOpenscap::OvalContent.new(oval_content_params)
        process_response @oval_content.save
      end

      api :PUT, '/compliance/oval_contents/:id', N_('Update an OVAL content')
      param :id, :identifier, :required => true
      param_group :oval_content

      def update
        process_response @oval_content.update(oval_content_params)
      end

      api :DELETE, '/compliance/oval_contents/:id', N_('Deletes an OVAL content')
      param :id, :identifier, :required => true

      def destroy
        process_response @oval_content.destroy
      end

      api :POST, '/compliance/oval_contents/sync', N_('Sync contents that have remote source URL')
      def sync
        @oval_contents = ForemanOpenscap::Oval::SyncOvalContents.new.sync_all
      end

      def assign_lone_taxonomies
        # here we go again...
      end

      def action_permission
        case params[:action]
        when 'sync'
          :update
        else
          super
        end
      end
    end
  end
end
