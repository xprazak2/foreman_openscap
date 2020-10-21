module ForemanOpenscap
  class OvalPolicy < ApplicationRecord
    audited
    include Authorizable
    include Taxonomix

    include PolicyCommon

    validates :name, :presence => true, :uniqueness => true, :length => { :maximum => 255 }
    validates :period, :inclusion => { :in => %w[weekly monthly custom], :message => _('is not a valid value') }
    validate :valid_cron_line, :valid_weekday, :valid_day_of_month

    has_many :oval_facet_oval_policies, :class_name => 'ForemanOpenscap::OvalFacetOvalPolicy'
    has_many :oval_facets, :through => :oval_facet_oval_policies, :class_name => 'ForemanOpenscap::Host::OvalFacet'
    has_many :hosts, :through => :oval_facets

    def host_ids=(host_ids)
      filtered_ids = host_ids.uniq.reject { |id| respond_to?(:empty) && id.empty? }
      existing_facets = ForemanOpenscap::Host::OvalFacet.where(:host_id => filtered_ids)
      new_facets = (filtered_ids - existing_facets.pluck(:host_id)).map { |id| ForemanOpenscap::Host::OvalFacet.new(:host_id => id) }
      self.oval_facets = existing_facets + new_facets
    end
  end
end
