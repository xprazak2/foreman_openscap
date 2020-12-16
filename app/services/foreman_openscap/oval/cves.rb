module ForemanOpenscap
  module Oval
    class Cves
      def create(host, cve_data)
        oval_results = cve_data['oval_results'].filter { |data| data['result'] == 'true' }

        definitions = oval_results.map { |res| create_or_update_definition res }

        def_ids_to_check = host.oval_definition_ids - definitions.pluck(:id)
        host.oval_definitions = definitions
        delete_orphaned_defs def_ids_to_check if host.save
        host
      end

      private

      def create_or_update_definition(hash)
        definition = ::ForemanOpenscap::OvalDefinition.find_or_create_by :definition_id => hash['definition_id']

        cves = hash['references'].map { |ref| ::ForemanOpenscap::Cve.find_or_create_by(:ref_id => ref['ref_id'], :ref_url => ref['ref_url']) }
        definition.cves = cves
        definition.save
        definition
      end

      def delete_orphaned_defs(ids)
        associated_ids = ::ForemanOpenscap::HostOvalDefinition.where(:oval_definition_id => ids).select(:oval_definition_id).pluck(:oval_definition_id)
        ::ForemanOpenscap::OvalDefinition.where(:id => ids - associated_ids).destroy_all
      end
    end
  end
end
