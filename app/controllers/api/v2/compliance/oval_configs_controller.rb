module Api::V2
  module Compliance
    class OvalConfigsController < ::Api::V2::BaseController
      before_action :find_hostgroup, :find_oval_policies, :find_openscap_proxy, :only => [:configure_hostgroup]

      def setup
        check_collection = ::ForemanOpenscap::OvalConfig::Setup.new.run
        render :json => { :results => check_collection.to_h }
      end

      def configure_hostgroup
        check_collection = ::ForemanOpenscap::OvalConfig::Configure.new.configure_hostgroup(@hostgroup, @oval_policies, @openscap_proxy)
        if check_collection.all_pass?
          render :json => { :message => "Hostgroup successfully configured." }
        else
          render :json => { :results => check_collection.find_failed.map(&:to_h) }, :status => :unprocessable_entity
        end
      end

      def configure_host
      end

      def check
      end

      private

      def find_hostgroup
        @hostgroup = Hostgroup.find params[:hostgroup_id]
        return render :json => { :error => "Hostgroup not found by id" }
      end

      def find_oval_policies
        @oval_policies = ForemanOpenscap::OvalPolicy.where :id => params[:oval_policy_ids]
      end

      def find_openscap_proxy
        @openscap_proxy = SmartProxy.find params[:openscap_proxy_id]
      end
    end
  end
end
