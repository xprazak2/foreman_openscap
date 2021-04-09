module ForemanOpenscap
  module OvalHostSearch
    # Test this
    def all_oval_hosts_by_policy_id(oval_policy_id)
      hg_ids = ::ForemanOpenscap::Hostgroup::OvalFacet.joins(:hostgroup_oval_facet_oval_policies)
                                                      .where(:foreman_openscap_hostgroup_oval_facet_oval_policies => {:oval_policy_id => oval_policy_id })
                                                      .pluck(:hostgroup_id)
      assigned_hgs = ::Hostgroup.where :id => hg_ids

      host_ids  = ForemanOpenscap::Host::OvalFacet.joins(:oval_facet_oval_policies)
                                                  .where(:foreman_openscap_oval_facet_oval_policies => { :oval_policy_id => oval_policy_id })
                                                  .pluck(:host_id)
      hosts = ::Host.where(:id => host_ids)
      all_hg_ids = (assigned_hgs.flat_map(&:descendant_ids) + assigned_hgs.flat_map(&:root_id)).uniq
      (hosts + ::Host.where(:hostgroup_id => all_hg_ids)).uniq
    end
  end
end
