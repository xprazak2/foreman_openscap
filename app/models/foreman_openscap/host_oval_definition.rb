module ForemanOpenscap
  class HostOvalDefinition < ApplicationRecord
    belongs_to_host
    belongs_to :oval_definition
  end
end
