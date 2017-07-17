module ForemanOpenscap::HostReportDashboard
  class Data
    attr_reader :report

    def initialize(policy, host)
      @latest_report = ::ForemanOpenscap::ArfReport.latest_of_policy(policy)
                                                   .where(:host_id => host.id)
                                                   .order('created_at DESC').first
      @report = [
        [:passed, report_passed, ArfReportDashboardHelper::COLORS[:passed]],
        [:failed, report_failed, ArfReportDashboardHelper::COLORS[:failed]],
        [:othered, report_othered, ArfReportDashboardHelper::COLORS[:othered]]
      ]
    end

    def has_data?
      latest_report.present?
    end

    private

    attr_accessor :latest_report

    def report_passed
      has_data? ? @latest_report.passed : 0
    end

    def report_failed
      has_data? ? @latest_report.failed : 0
    end

    def report_othered
      has_data? ? @latest_report.othered : 0
    end
  end
end
