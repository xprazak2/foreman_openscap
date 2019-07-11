module Mutations
  module TailoringFiles
    class Delete < DeleteMutation
      description 'Deletes a Tailoring File'
      graphql_name 'DeleteTailoringFile'

      resource_class ::ForemanOpenscap::TailoringFile
    end
  end
end
