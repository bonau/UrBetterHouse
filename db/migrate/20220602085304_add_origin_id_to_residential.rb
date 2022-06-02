class AddOriginIdToResidential < ActiveRecord::Migration[6.0]
  def change
    add_column :residentials, :origin_id, :integer
    add_index :residentials, :origin_id
  end
end
