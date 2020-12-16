FactoryBot.define do
  factory :openscap_feature, :class => Feature do
    name { 'Openscap' }
  end

  factory :openscap_proxy, :class => SmartProxy do
    sequence(:name) { |n| "openscap_proxy#{n}" }
    sequence(:url) { |n| "https://anywhere#{n}.net:8443" }
    features { [Feature.find_by(:name => 'Openscap') || FactoryBot.create(:openscap_feature)] }
  end

  factory :compliance_host, :class => Host::Managed do
    sequence(:name) { |n| "host#{n}" }
    sequence(:hostname) { |n| "hostname#{n}" }
    root_pass { 'xybxa6JUkz63w' }
    openscap_proxy { SmartProxy.unscoped.with_features('Openscap').first || FactoryBot.create(:openscap_proxy) }
    policies { [] }
  end

  factory :oval_facet, :class => ForemanOpenscap::Host::OvalFacet

  factory :oval_host, :class => Host::Managed do
    sequence(:name) { |n| "host#{n}" }
  end

  factory :cve, :class => ForemanOpenscap::Cve do
    sequence(:ref_id) { |n| "CVE-#{n}" }
    sequence(:ref_url) { |n| "https://access.redhat.com/security/cve/CVE-#{n}" }
  end

  factory :oval_definition, :class => ForemanOpenscap::OvalDefinition do
    sequence(:definition_id) { |n| "oval:com.redhat.rhsa:def:2020#{n}" }
  end
end
