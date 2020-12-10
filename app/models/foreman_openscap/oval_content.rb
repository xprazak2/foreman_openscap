module ForemanOpenscap
  class OvalContent < ApplicationRecord
    audited :except => [:scap_file]
    include Authorizable
    include Taxonomix
    include ScapFileContent

    scoped_search :on => :name, :complete_value => true

    has_many :oval_policies
    belongs_to :content_stream

    validates :name, :presence => true, :length => { :maximum => 255 }, uniqueness: true

    def to_h
      { :id => id, :name => name, :original_filename => original_filename, :changed_at => changed_at }
    end
  end
end
