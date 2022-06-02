require 'rails_helper'

RSpec.describe "residentials/edit", type: :view do
  before(:each) do
    @residential = assign(:residential, Residential.create!(
      thumb_pic: "https://urhouse.s3.amazonaws.com/images/rentals/e608961813ac47bc0cfbcac85dd2147f.jpg?31363436353736353837",
      title: "MyString",
      price_per_month: 1,
      address: "MyString",
      total_room: 1,
      livingroom: 1,
      has_mrt: false,
      mrt_line: "MyString"
    ))
  end

  it "renders the edit residential form" do
    render

    assert_select "form[action=?][method=?]", residential_path(@residential), "post" do

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
