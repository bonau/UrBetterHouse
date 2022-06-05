class AddMoreColumnsToResidential < ActiveRecord::Migration[6.0]
  def change
    add_column :residentials, :city, :string
    add_column :residentials, :dist, :string
    add_column :residentials, :net_size, :float
  end
end
