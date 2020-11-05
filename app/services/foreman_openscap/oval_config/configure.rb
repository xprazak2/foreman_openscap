module ForemanOpenscap
  module OvalConfig
    class Configure
      def initialize
        @result = {}
        @config = ForemanOpenscap::ClientConfig::Ansible.new(::ForemanOpenscap::OvalPolicy)
      end

      def configure_hostgroup(hostgroup, oval_policies, openscap_proxy)
        # add failed check if oval_policy_ids.present? && !openscap_proxy_id

        check_collection = ::ForemanOpenscap::OvalConfig::Setup.new.run
        return check_collection.find_failed unless check_collection.all_pass?

        ansible_role = @config.find_config_item

        policies = ::ForemanOpenscap::OvalPolicy.where :id => oval_policy_ids
        hg = if !openscap_proxy && oval_policies.empty?
          unassign_from_hostgroup hostgroup
        else
          assign_to_hostgroup(hostgroup, oval_policies, openscap_proxy, ansible_role)
        end
        check_collection.add_check hg_to_check(hg)
      end

      private

      def assign_to_hostgroups(hg, oval_policies, openscap_proxy, ansible_role)
        role_ids = hg.ansible_role_ids + [ansible_role.id]
        hg.ansible_role_ids = hg.ansible_role_ids + [ansible_role.id] unless hg.inherited_and_own_ansible_roles.include? ansible_role
        hg.oval_policies = oval_policies
        hg.openscap_proxy = openscap_proxy
        hg.save if hg.changed?

        hg.reload

        add_overrides ansible_role.ansible_variables, hg, @config
        hg
      end

      def hg_to_check(hg)
        check = SetupCheck.new(
          :hostgroup_configured,
          "Was hostgroup configured successfully?",
          ->() { _("Failed to configure hostgroup due to the following errors %s") % hg.errors }
        )
        hg.errors.any? ? check.fail! : check.pass!
        check
      end

      def unassign_from_hostgroup(hg)
      end

      def assign_to_hosts()
      end
    end
  end
end
