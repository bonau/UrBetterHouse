require 'rails_helper'

RSpec.describe "residentials/index", type: :view do
  before(:each) do
    assign(:residentials, [
      Residential.create!(
        thumb_pic: "Thumb Pic",
        title: "Title",
        price_per_month: 2,
        address: "Address",
        total_room: 3,
        livingroom: 4,
        has_mrt: false,
        mrt_line: "Mrt Line"
      ),
      Residential.create!(
        thumb_pic: "Thumb Pic",
        title: "Title",
        price_per_month: 2,
        address: "Address",
        total_room: 3,
        livingroom: 4,
        has_mrt: false,
        mrt_line: "Mrt Line"
      )
    ])
  end

  it "renders a list of residentials" do
    render
    assert_select "tr>td", text: "Thumb Pic".to_s, count: 2
    assert_select "tr>td", text: "Title".to_s, count: 2
    assert_select "tr>td", text: 2.to_s, count: 2
    assert_select "tr>td", text: "Address".to_s, count: 2
    assert_select "tr>td", text: 3.to_s, count: 2
    assert_select "tr>td", text: 4.to_s, count: 2
    assert_select "tr>td", text: false.to_s, count: 2
    assert_select "tr>td", text: "Mrt Line".to_s, count: 2
  end
end
