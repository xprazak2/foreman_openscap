module ForemanOpenscap
  module BaseTemplateScopeExtensions
    extend ActiveSupport::Concern

    def cves_without_fix(oval_definitions)
      ForemanOpenscap::Cve.of_oval_definitions oval_definitions.pluck(:id)
    end
  end
end
