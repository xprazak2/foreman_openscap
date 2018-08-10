module ForemanOpenscap
  class PuppetclassListener
    def puppetclass_created(puppetclass)
      class_name = 'foreman_scap_client'
      policies_param_name = 'policies'
      return unless puppetclass.name == class_name

      unless policies_param = puppetclass.class_params.find_by(key: policies_param_name)
        # replace with notification?
        puppetclass.errors[:base] << _("Puppet class %{class} does not have %{parameter} class parameter.") % { :class => class_name, :parameter => policies_param_name }
      end

      policies_param.override      = true
      policies_param.key_type      = 'array'
      policies_param.default_value = '<%= @host.policies_enc %>'

      if policies_param.changed? && !policies_param.save
        # replace with notification?
        puppetclass.errors[:base] << _("%{parameter} class parameter for class %{class} could not be configured.") % { :class => class_name, :parameter => policies_param_name }
      end
    end
  end
end
