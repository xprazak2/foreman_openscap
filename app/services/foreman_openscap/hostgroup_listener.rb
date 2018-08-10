module ForemanOpenscap
  class HostgroupListener
    def hostgroup_saved(hostgroup)
      add_puppet_overrides(hostgroup)
      add_ansible_overrides(hostgroup)
    end

    private

    def add_puppet_overrides(hostgroup)
      return unless hostgroup.puppetclasses.include? (puppetclass = Puppetclass.find_by(name: ForemanOpenscap.puppetclass_name))
      populate_puppet_overrides(puppetclass, hostgroup)
    end

    def add_ansible_overrides(hostgroup)
      return if !ForemanAnsible.defined? ||
        !hostgroup.ansible_roles.include? (ansible_role = AnsibleRole.find_by(name: ForemanOpenscap.ansible_role_name))
      populate_ansible_overrides(ansible_role, hostgroup)
    end

    def populate_puppet_overrides(puppetclass, hostgroup)
      puppetclass.class_params.where(:override => true).find_each do |override|
        return unless hostgroup.openscap_proxy && (url = hostgroup.openscap_proxy.url).present?

        openscap_proxy_uri = URI.parse(url)
        case override.key
        when ForemanOpenscap.server_parameter
          lookup_value      = LookupValue.where(:match => "hostgroup=#{hostgroup.to_label}", :lookup_key_id => override.id).first_or_initialize
          lookup_value.update_attribute(:value, openscap_proxy_uri.host)
        when ForemanOpenscap.port_parameter
          lookup_value      = LookupValue.where(:match => "hostgroup=#{hostgroup.to_label}", :lookup_key_id => override.id).first_or_initialize
          lookup_value.update_attribute(:value, openscap_proxy_uri.port)
        end
      end
    end

    def populate_ansible_overrides(ansible_role, hostgroup)
      # todo
    end
  end
end
