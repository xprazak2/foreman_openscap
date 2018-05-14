class XccdfRulesController < ApplicationController
  def index
    logs = Log.by_report_type(ForemanOpenscap::ArfReport).uniq(&:source_id)
    @res = logs.map do |log|
      { :source => log.source, :message => log.message }
    end
  end
end
