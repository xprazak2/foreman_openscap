FactoryBot.define do
  factory :content_stream, :class => ::ForemanOpenscap::ContentStream do |f|
    f.sequence(:name) { |n| "content stream #{n}" }
    f.url { 'http://streaming-test-stream.example.com' }
  end
end
