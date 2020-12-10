FactoryBot.define do
  factory :oval_content, :class => ::ForemanOpenscap::OvalContent do |f|
    f.sequence(:name) { |n| "oval_content_#{n}" }
    f.sequence(:original_filename) { |n| "test-oval-#{n}.xml" }
    f.scap_file { '<xml>foo</xml>' }
  end
end
