require 'rails_helper'

RSpec.describe "residentials/new", type: :view do
  before(:each) do
    assign(:residential, Residential.new(
      thumb_pic: "MyString",
      title: "MyString",
      price_per_month: 1,
      address: "MyString",
      total_room: 1,
      livingroom: 1,
      has_mrt: false,
      mrt_line: "MyString"
    ))
  end

  it "renders new residential form" do
    render

    assert_select "form[action=?][method=?]", residentials_path, "post" do

      assert_select "input[name=?]", "residential[thumb_pic]"

      assert_select "input[name=?]", "residential[title]"

      assert_select "input[name=?]", "residential[price_per_month]"

      assert_select "input[name=?]", "residential[address]"

      assert_select "input[name=?]", "residential[total_room]"

      assert_select "input[name=?]", "residential[livingroom]"

      assert_select "input[name=?]", "residential[has_mrt]"

      assert_select "input[name=?]", "residential[mrt_line]"
    end
  end
end
