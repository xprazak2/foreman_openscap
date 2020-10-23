FactoryBot.define do
  factory :ansible_role do
    sequence(:name) { |n| "ansible_role_#{n}" }
  end
end

FactoryBot.define do
  factory :ansible_variable do
    sequence(:key) { |n| "ansible_variable_#{n}" }
    sequence(:default_value) { |n| "default_value_#{n}" }
    ansible_role
    imported { true }
    override { false }
  end
end
