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

    has_many :hostgroup_oval_facet_oval_policies, :class_name => 'ForemanOpenscap::HostgroupOvalFacetOvalPolicy'
    has_many :hostgroup_oval_facets, :through => :hostgroup_oval_facet_oval_policies, :class_name => 'ForemanOpenscap::Hostgroup::OvalFacet', :source => :oval_facet
    has_many :hostgroups, :through => :hostgroup_oval_facets

    def host_ids=(host_ids)
      self.oval_facets = facets_to_assign(host_ids, :host_id, ForemanOpenscap::Host::OvalFacet)
    end

    def hostgroup_ids=(hostgroup_ids)
      self.hostgroup_oval_facets = facets_to_assign(hostgroup_ids, :hostgroup_id, ForemanOpenscap::Hostgroup::OvalFacet)
    end

    def to_enc
      {
        :id => id,
        :download_path => 'xyz'
      }.merge(period_enc).with_indifferent_access
    end

    private

    def facets_to_assign(ids, key, facet_class)
      filtered_ids = ids.uniq.reject { |id| respond_to?(:empty) && id.empty? }
      existing_facets = facet_class.where(key => filtered_ids)
      new_facets = (filtered_ids - existing_facets.pluck(key)).map { |id| facet_class.new(key => id) }
      existing_facets + new_facets
    end
  end
end
