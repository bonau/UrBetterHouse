class CreateResidentials < ActiveRecord::Migration[6.0]
  def change
    create_table :residentials do |t|
      t.string :thumb_pic
      t.string :title
      t.integer :price_per_month
      t.string :address
      t.integer :total_room
      t.integer :livingroom
      t.boolean :has_mrt
      t.string :mrt_line

      t.timestamps
    end
  end
end
