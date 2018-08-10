require "foreman_openscap/engine"

module ForemanOpenscap
  def self.puppetclass_name
    'foreman_scap_client'
  end

  def self.ansible_role_name
    'foreman_scap_client'
  end

  def self.server_class_parameter
    'server'
  end

  def self.port_class_parameter
    'port'
  end
end
