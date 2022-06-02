# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_06_02_085304) do

  create_table "residentials", force: :cascade do |t|
    t.string "thumb_pic"
    t.string "title"
    t.integer "price_per_month"
    t.string "address"
    t.integer "total_room"
    t.integer "livingroom"
    t.boolean "has_mrt"
    t.string "mrt_line"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "origin_id"
    t.index ["origin_id"], name: "index_residentials_on_origin_id"
  end

end
