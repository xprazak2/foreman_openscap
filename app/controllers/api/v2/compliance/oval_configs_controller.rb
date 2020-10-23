module Api::V2
  module Compliance
    class OvalConfigsController < ::Api::V2::BaseController
      def setup
        checks = ::ForemanOpenscap::OvalConfig::Setup.new.run
        render :json => { :results => checks.map(&:to_h) }
      end

      def configure
      end

      def check
      end
    end
  end
end
