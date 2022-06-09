class CreateFavorites < ActiveRecord::Migration[6.0]
  def change
    create_table :favorites do |t|
      t.integer :user_id
      t.integer :residential_id

      t.timestamps
    end
    add_index :favorites, :user_id
    add_index :favorites, :residential_id
  end
end
