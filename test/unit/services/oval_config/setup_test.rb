require 'test_plugin_helper'
require 'pry-byebug'

class ForemanOpenscap::OvalConfig::SetupTest < ActiveSupport::TestCase

  setup do
    @config = ForemanOpenscap::ClientConfig::Ansible.new(::ForemanOpenscap::OvalPolicy)
  end

  test "should fail check when Ansible not available" do
    ForemanOpenscap::ClientConfig::Ansible.any_instance.stubs(:available?).returns(false)

    results = ForemanOpenscap::OvalConfig::Setup.new.run
    assert find_result(results, :foreman_ansible_present).failed?
    assert results.select { |res| res.id != :foreman_ansible_present }.all?(&:not_checked?)
  end

  test "should fail check when Ansible role for client not imported" do
    ForemanOpenscap::ClientConfig::Ansible.any_instance.stubs(:find_config_item).returns(nil)

    results = ForemanOpenscap::OvalConfig::Setup.new.run
    assert find_result(results, :foreman_ansible_present).passed?
    assert find_result(results, :foreman_scap_client_role_present).failed?

    assert results.select { |res| res.id != :foreman_ansible_present && res.id != :foreman_scap_client_role_present }
      .all?(&:not_checked)
  end

  test "should fail check when required Ansible variables are not imported" do
    FactoryBot.create(:ansible_role, :name => @config.ansible_role_name)
    results = ForemanOpenscap::OvalConfig::Setup.new.run
    assert find_result(results, :foreman_ansible_present).passed?
    assert find_result(results, :foreman_scap_client_role_present).passed?

    res = find_result(results, :foreman_scap_client_vars_present)
    assert res.failed?
    msg = "The following Ansible Variables were not found: foreman_scap_client_oval_policies, foreman_scap_client_port, foreman_scap_client_server, please import them before running this action again."
    assert res.fail_msg, msg
    assert override_results.all?(&:not_checked?)
  end

  test "should fail check when fails to override a variable" do
    role = FactoryBot.create(:ansible_role, :name => @config.ansible_role_name)
    FactoryBot.create(:ansible_variable, :key => @config.port_param, :ansible_role => role)
    FactoryBot.create(:ansible_variable, :key => @config.server_param, :ansible_role => role)
    FactoryBot.create(:ansible_variable, :key => @config.policies_param, :ansible_role => role)
    AnsibleVariable.any_instance.stubs(:save).returns(false)
    AnsibleVariable.any_instance.stubs(:changed?).returns(true)
    results = ForemanOpenscap::OvalConfig::Setup.new.run
    assert find_result(results, :foreman_ansible_present).passed?
    assert find_result(results, :foreman_scap_client_role_present).passed?
    assert find_result(results, :foreman_scap_client_vars_present).passed?
    assert override_results(results).all?(&:failed?)
  end

  test "should pass all checks" do
    role = FactoryBot.create(:ansible_role, :name => @config.ansible_role_name)
    port_param = FactoryBot.create(:ansible_variable, :key => @config.port_param, :ansible_role => role)
    server_param = FactoryBot.create(:ansible_variable, :key => @config.server_param, :ansible_role => role)
    policies_param = FactoryBot.create(:ansible_variable, :key => @config.policies_param, :ansible_role => role)
    assert results.all(&:passed?)

    assert @config.policies_param_default_value, policies_param.default_value
    assert_equal 'array', policies_param.key_type
    refute policies_param.hidden_value
    assert policies_param.override

    refute port_param.hidden_value
    assert_equal 'integer', port_param.key_type
    assert port_param.override

    refute server_param.hidden_value
    assert_equal 'string', server_param.key_type
    assert server_param.override
  end

  def find_result(results, id)
    results.find { |res| res.id == id }
  end

  def override_results(results)
    results.select do |res|
      res.id == :foreman_scap_client_server_overriden ||
      res.id == :foreman_scap_client_port_overriden ||
      res.id == :foreman_scap_client_policies_overriden
    end
  end
end
