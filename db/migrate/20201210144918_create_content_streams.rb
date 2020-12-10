class CreateContentStreams < ActiveRecord::Migration[6.0]
  def change
    create_table :foreman_openscap_content_streams do |t|
      t.string :name, :null => false, :unique => true
      t.string :url, :null => false
    end
  end
end
