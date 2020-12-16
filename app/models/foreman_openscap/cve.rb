module ForemanOpenscap
  class Cve < ApplicationRecord
    has_many :oval_definition_cves
    has_many :oval_definitions, :through => :oval_definition_cves
    has_many :hosts, :through => :oval_definitions

    validates :ref_id, :ref_url, :presence => true, :uniqueness => true

    scope :advisory, lambda { where('ref_id LIKE ?', 'RH%') }

    class Jail < ::Safemode::Jail
      allow :ref_id, :ref_url
    end
  end
end
