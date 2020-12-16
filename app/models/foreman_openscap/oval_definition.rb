module ForemanOpenscap
  class OvalDefinition < ApplicationRecord
    has_many :host_oval_definitions
    has_many :hosts, :through => :host_oval_definitions

    has_many :oval_definition_cves
    has_many :cves, :through => :oval_definition_cves, :dependent => :destroy

    scope :with_fix, lambda { joins(:cves).merge(Cve.advisory).distinct }
    scope :without_fix, lambda { where.not(:id => with_fix.pluck(:id)) }
  end
end
