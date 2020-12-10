module Foreman::Controller::Parameters::ContentStream
  extend ActiveSupport::Concern

  class_methods do
    def content_stream_params_filter
      Foreman::ParameterFilter.new(::ForemanOpenscap::ContentStream).tap do |filter|
        filter.permit :name, :url, :location_ids => [], :organization_ids => []
      end
    end
  end

  def content_stream_params
    self.class.content_stream_params_filter.filter_params(params, parameter_filter_context)
  end
end
