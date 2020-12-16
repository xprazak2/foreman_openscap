module ForemanOpenscap
  class Cve < ApplicationRecord
    has_many :oval_definition_cves
    has_many :oval_definitions, :through => :oval_definition_cves
    has_many :hosts, :through => :oval_definitions

    validates :ref_id, :ref_url, :presence => true, :uniqueness => true

    scope :advisory, lambda { where('ref_id LIKE ?', 'RH%') }
    scope :cves_only, lambda { where.not :id => advisory.pluck(:id) }

    scope :of_oval_definitions, lambda { |def_ids| joins(:oval_definition_cves).merge(OvalDefinitionCve.of_oval_definitions(def_ids)) }

    class Jail < ::Safemode::Jail
      allow :ref_id, :ref_url
    end
  end
end
