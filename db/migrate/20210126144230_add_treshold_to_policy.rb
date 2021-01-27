class AddTresholdToPolicy < ActiveRecord::Migration[6.0]
  def change
    add_column :foreman_openscap_policies, :treshold, :integer, :null => false, :default => 100
  end
end
