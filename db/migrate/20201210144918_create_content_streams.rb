class CreateContentStreams < ActiveRecord::Migration[6.0]
  def change
    create_table :foreman_openscap_content_streams do |t|
      t.string :name, :null => false, :unique => true
      t.string :url, :null => false
    end

    add_column :foreman_openscap_oval_contents, :changed_at, :datetime
    add_column :foreman_openscap_oval_contents, :content_stream_id, :integer, :references => :content_stream
  end
end
