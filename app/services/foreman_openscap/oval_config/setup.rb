module ForemanOpenscap
  module OvalConfig
    class Setup
      include ::ForemanOpenscap::LookupKeyOverridesCommon

      def initialize
        @config = ForemanOpenscap::ClientConfig::Ansible.new(::ForemanOpenscap::OvalPolicy)
        @checks = initial_check_attrs.map do |hash|
          SetupCheck.new(hash[:id], hash[:title], hash[:fail_msg])
        end
      end

      def run
        override @config
        @checks
      end

      def pass_check(check_id)
        find_check(check_id).pass!
      end

      def handle_config_not_available(config)
        return pass_check :foreman_ansible_present if config.available?
        fail_check :foreman_ansible_present
      end

      def handle_config_item_not_available(config, item)
        return pass_check :foreman_scap_client_role_present if item
        fail_check :foreman_scap_client_role_present
      end

      def handle_missing_lookup_keys(config, key_names)
        return pass_check :foreman_scap_client_vars_present if key_names.empty?
        fail_check :foreman_scap_client_vars_present, :missing_vars => key_names
      end

      def handle_server_param_override(config, param)
        handle_param_override :foreman_scap_client_server_overriden, config, param
      end

      def handle_port_param_override(config, param)
        handle_param_override :foreman_scap_client_port_overriden, config, param
      end

      def handle_policies_param_override(config, param)
        handle_param_override :foreman_scap_client_policies_overriden, config, param
      end

      def handle_param_override(check_id, config, param)
        return fail_check check_id if param.changed? && !param.save
        pass_check check_id
      end

      def fail_check(check_id, error_data = nil)
        find_check(check_id).fail_with! error_data
        false
      end

      def find_check(check_id)
        @checks.find { |item| item.id == check_id }
      end

      private

      def initial_check_attrs
        override_msg = _("Could not update Ansible Variables with override: true")

        [
          { :id => :foreman_ansible_present,
            :title => _("Is foreman_ansible present?"),
            :fail_msg => ->(hash) { _("foreman_ansible plugin not found, please install it before running this action again.") }
          },
          { :id => :foreman_scap_client_role_present,
            :title => _("Is theforeman.foreman_scap_client present?"),
            :fail_msg => ->(hash) { _("theforeman.foreman_scap_client Ansible Role not found, please import it before running this action again.") }
          },
          { :id => :foreman_scap_client_vars_present,
            :title => _("Are required variables for theforeman.foreman_scap_client present?"),
            :fail_msg => ->(hash) { _("The following Ansible Variables were not found: %{missing_vars}, please import them before running this action again.") % hash }
          },
          { :id => :foreman_scap_client_server_overriden,
            :title => _("Is %s param set to be overriden?") % @config.server_param,
            :fail_msg => ->(hash) { override_msg }
          },
          { :id => :foreman_scap_client_port_overriden,
            :title => _("Is %s param set to be overriden?") % @config.port_param,
            :fail_msg => ->(hash) { override_msg }
          },
          { :id => :foreman_scap_client_policies_overriden,
            :title => _("Is %s param set to be overriden?") % @config.policies_param,
            :fail_msg => ->(hash) { override_msg }
          }
        ]
      end
    end
  end
end