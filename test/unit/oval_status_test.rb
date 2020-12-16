require 'test_plugin_helper'

class OvalStatusTest < ActiveSupport::TestCase
  test 'should have no vulnerabilities' do
    host = FactoryBot.create(:oval_host)
    policy = FactoryBot.create(:oval_policy)
    FactoryBot.create(:oval_facet, :host => host, :oval_policies => [policy])

    status = ForemanOpenscap::OvalStatus.new
    status.host = host
    assert_equal 0, status.to_status
    assert status.relevant?
  end

  test 'should have CVEs with a fix' do
    cve = FactoryBot.create(:cve)
    advisory = FactoryBot.create(:cve, :ref_id => "RHSA-2020:15")
    definition = FactoryBot.create(:oval_definition, :cves => [cve, advisory])
    host = FactoryBot.create(:oval_host, :oval_definitions => [definition])

    policy = FactoryBot.create(:oval_policy)
    FactoryBot.create(:oval_facet, :host => host, :oval_policies => [policy])

    status = ForemanOpenscap::OvalStatus.new
    status.host = host
    assert_equal 0, status.to_status
    assert status.relevant?
  end

  test 'should have CVEs without a fix' do
    cve = FactoryBot.create(:cve)
    definition = FactoryBot.create(:oval_definition, :cves => [cve])
    host = FactoryBot.create(:oval_host, :oval_definitions => [definition])

    policy = FactoryBot.create(:oval_policy)
    FactoryBot.create(:oval_facet, :host => host, :oval_policies => [policy])

    status = ForemanOpenscap::OvalStatus.new
    status.host = host
    assert_equal 1, status.to_status
    assert status.relevant?
  end

  test 'should not be relevant without oval policy' do
    host = FactoryBot.create(:oval_host, :oval_definitions => [FactoryBot.create(:oval_definition)])
    status = ForemanOpenscap::OvalStatus.new
    status.host = host
    refute status.relevant?
  end
end
