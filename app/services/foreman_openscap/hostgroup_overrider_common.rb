module ForemanOpenscap
  module HostgroupOverriderCommon
    def add_overrides(collection, hostgroup, config)
      collection.where(:override => true).find_each do |override|
        return unless hostgroup.openscap_proxy && (url = hostgroup.openscap_proxy.url).present?

        openscap_proxy_uri = URI.parse(url)
        case override.key
        when config.server_param
          lookup_value = LookupValue.where(:match => "hostgroup=#{hostgroup.to_label}", :lookup_key_id => override.id).first_or_initialize
          lookup_value.update_attribute(:value, openscap_proxy_uri.host)
        when config.port_param
          lookup_value = LookupValue.where(:match => "hostgroup=#{hostgroup.to_label}", :lookup_key_id => override.id).first_or_initialize
          lookup_value.update_attribute(:value, openscap_proxy_uri.port)
        end
      end
    end

    def remove_overrides(collection, hostgroup, config)
      collection.where(:override => true).find_each do |override|
        if override.key == config.server_param || override.key == config.port_param
          LookupValue.find_by(:match => "hostgroup=#{hostgroup.to_label}", :lookup_key_id => override.id)&.destroy
        end
      end
    end
  end
end
