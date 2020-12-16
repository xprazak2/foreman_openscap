module ForemanOpenscap
  module OvalFacetHostExtensions
    extend ActiveSupport::Concern

    ::Host::Managed::Jail.allow :oval_policies_enc, :oval_policies_enc_raw, :cves

    included do
      has_many :oval_policies, :through => :oval_facet, :class_name => 'ForemanOpenscap::OvalPolicy'

      has_many :host_oval_definitions, :class_name => 'ForemanOpenscap::HostOvalDefinition', :foreign_key => :host_id
      has_many :oval_definitions, :through => :host_oval_definitions, :class_name => 'ForemanOpenscap::OvalDefinition', :source => :oval_definition

      has_many :cves, :through => :oval_definitions, :class_name => 'ForemanOpenscap::Cve', :source => :cves
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
  end
end
