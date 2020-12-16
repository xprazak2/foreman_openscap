module ForemanOpenscap
  class OvalDefinitionCve < ApplicationRecord
    belongs_to :oval_definition
    belongs_to :cve
  end
end
