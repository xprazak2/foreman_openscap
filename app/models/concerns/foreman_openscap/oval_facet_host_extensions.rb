module ForemanOpenscap
  module OvalFacetHostExtensions
    extend ActiveSupport::Concern

    ::Host::Managed::Jail.allow :oval_policies_enc, :oval_policies_enc_raw, :cves

    included do
      has_many :oval_policies, :through => :oval_facet, :class_name => 'ForemanOpenscap::OvalPolicy'

      has_many :host_cves, :class_name => 'ForemanOpenscap::HostCve', :foreign_key => :host_id
      has_many :cves, :through => :host_cves, :class_name => 'ForemanOpenscap::Cve', :source => :cve

      scoped_search :relation => :oval_policies, :on => :id, :complete_value => false, :rename => :all_with_oval_policy_id,
                    :only_explicit => true, :operators => ['='], :ext_method => :search_by_oval_policy_id

      scoped_search :relation => :host_cves, :on => :cve_id, :rename => :cve_id, :complete_value => false
    end

    def combined_oval_policies
      combined = oval_policies
      combined += hostgroup.oval_policies + hostgroup.inherited_oval_policies if hostgroup
      combined.uniq
    end

    def oval_policies_enc_raw
      combined_oval_policies.map(&:to_enc)
    end

    def oval_policies_enc
      oval_policies_enc_raw.to_json
    end

    module ClassMethods
      include ::ForemanOpenscap::OvalHostSearch

      def search_by_oval_policy_id(key, operator, oval_policy_id)
        all_ids = all_oval_hosts_by_policy_id(oval_policy_id).pluck(:id)
        { :conditions => "hosts.id IN (#{all_ids.empty? ? 'NULL' : all_ids.join(',')})" }
      end
    end
  end
end
