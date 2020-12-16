class CreateCves < ActiveRecord::Migration[6.0]
  def change
    create_table :foreman_openscap_cves do |t|
      t.string :ref_id, :null => false, :unique => true
      t.string :ref_url, :null => false, :unique => true
    end

    create_table :foreman_openscap_oval_definitions do |t|
      t.string :definition_id, :null => false, :unique => true
    end

    create_table :foreman_openscap_host_oval_definitions do |t|
      t.references :host, :null => false
      t.references :oval_definition, :null => false, :index => { :name => 'index_host_oval_definitions_on_oval_definition_id' }
    end

    create_table :foreman_openscap_oval_definition_cves do |t|
      t.references :cve, :null => false
      t.references :oval_definition, :null => false, :index => { :name => 'index_oval_definition_cves_on_oval_definition_id' }
    end
  end
end
