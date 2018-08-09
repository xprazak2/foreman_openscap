module ForemanOpenscap
  module PuppetclassExtensions
    extend ActiveSupport::Concern

    included do
      include Wisper::Publisher

      after_create :publish_puppetclass_created
    end

    private

    def publish_puppetclass_created
      broadcast(:puppetclass_created, self)
    end
  end
end
