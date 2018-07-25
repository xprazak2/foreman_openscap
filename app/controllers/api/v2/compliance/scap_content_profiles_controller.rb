module Api::V2
  module Compliance
    class ScapContentProfilesController < ::Api::V2::BaseController
      before_action :find_resource, :only => %w[show]

      def resource_name
        '::ForemanOpenscap::ScapContentProfile'
      end

      api :GET, '/compliance/scap_content_profiles', N_('List scap content profiles')
      param_group :search_and_pagination, ::Api::V2::BaseController

      def index
        @scap_content_profiles = resource_scope_for_index(:permission => :view_scap_content_profiles)
      end

      api :GET, '/compliance/scap_content_profiles/:id', N_('Show a scap content profile')
      param :id, :identifier, :required => true
      def show
      end
    end
  end
end
