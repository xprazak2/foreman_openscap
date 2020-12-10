module ForemanOpenscap
  class ContentStream < ApplicationRecord
    include Authorizable
    include Taxonomix

    validates :name, :presence => true, :uniqueness => true
    validates :url, :presence => true
  end
end
