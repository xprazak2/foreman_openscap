module Api::V2
  module Compliance
    class OvalConfigsController < ::Api::V2::BaseController
      before_action :find_hostgroup, :find_oval_policies, :find_openscap_proxy, :only => [:configure_hostgroup]

      def setup
        check_collection = ::ForemanOpenscap::OvalConfig::Setup.new.run
        render :json => { :results => check_collection.to_h }
      end
    end
  end
end
