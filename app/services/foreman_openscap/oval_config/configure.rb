module ForemanOpenscap
  module OvalConfig
    class Configure
      include ::ForemanOpenscap::HostgroupOverriderCommon

      def initialize
        @config = ForemanOpenscap::ClientConfig::Ansible.new(::ForemanOpenscap::OvalPolicy)
      end

      def assign_hostgroups(oval_policy, hostgroup_ids)
        check_collection = ::ForemanOpenscap::OvalConfig::Setup.new.run
        return check_collection unless check_collection.all_passed?

        ansible_role = @config.find_config_item

        hgs_with_proxy, hgs_without_proxy = openscap_proxy_associated hostgroup_ids
        oval_policy.hostgroup_ids = hgs_with_proxy.pluck(:id)

        check_collection = hgs_without_proxy_to_check hgs_without_proxy

        unless oval_policy.save
          return check_collection.add_check(model_to_check oval_policy)
        end

        check_collection.merge(modify_hostgroups hgs_with_proxy, oval_policy, ansible_role)
      end

      private

      def openscap_proxy_associated(hostgroup_ids)
        ::Hostgroup.where(:id => hostgroup_ids).partition(&:openscap_proxy)
      end

      def modify_hostgroups(hgs, oval_policy, ansible_role)
        hgs.reduce(CheckCollection.new) do |memo, hg|
          role_ids = hg.ansible_role_ids + [ansible_role.id]
          hg.ansible_role_ids = hg.ansible_role_ids + [ansible_role.id] unless hg.inherited_and_own_ansible_roles.include? ansible_role
          hg.save if hg.changed?
          memo.add_check(model_to_check hg)
          add_overrides ansible_role.ansible_variables, hg, @config
          memo
        end
      end

      def hgs_without_proxy_to_check(hgs)
        hgs.reduce(CheckCollection.new) do |memo, hg|
          memo.add_check(
            SetupCheck.new(
              :title => (_("Was %s hostgroup configured successfully?") % hg.name),
              :fail_msg => ->(_) { _("Assign openscap_proxy before proceeding.")}
            ).fail!
          )
        end
      end

      def model_to_check(model)
        model_name = model.class.name.demodulize

        check = SetupCheck.new(
          :title => (_("Was #{model_name} #{model.name} configured successfully?") % { :model_name => model_name, :name => model.name }),
          :errors => model.errors.to_h
        )
        model.errors.any? ? check.fail! : check.pass!
      end
    end
  end
end
