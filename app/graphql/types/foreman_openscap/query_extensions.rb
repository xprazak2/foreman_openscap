module Types
  module ForemanOpenscap
    module QueryExtensions
      extend ActiveSupport::Concern

      included do
        record_field :tailoring_file, ::Types::TailoringFile
        collection_field :tailoring_files, ::Types::TailoringFile
      end
    end
  end
end
