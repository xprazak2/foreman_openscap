module ForemanOpenscap
  module OvalFacetHostExtensions
    extend ActiveSupport::Concern

    included do
      has_many :oval_policies, :through => :oval_facet, :class_name => 'ForemanOpenscap::OvalPolicy'
    end
  end
end
