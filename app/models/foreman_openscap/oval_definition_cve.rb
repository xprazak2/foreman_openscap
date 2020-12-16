module ForemanOpenscap
  class OvalDefinitionCve < ApplicationRecord
    belongs_to :oval_definition
    belongs_to :cve

    scope :of_oval_definitions, lambda { |def_ids| joins(:oval_definition).where(:oval_definition_id => def_ids) }
  end
end
