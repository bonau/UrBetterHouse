require 'rails_helper'

RSpec.describe "residentials/show", type: :view do
  before(:each) do
    @residential = assign(:residential, Residential.create!(
      thumb_pic: "Thumb Pic",
      title: "Title",
      price_per_month: 2,
      address: "Address",
      total_room: 3,
      livingroom: 4,
      has_mrt: false,
      mrt_line: "Mrt Line"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Thumb Pic/)
    expect(rendered).to match(/Title/)
    expect(rendered).to match(/2/)
    expect(rendered).to match(/Address/)
    expect(rendered).to match(/3/)
    expect(rendered).to match(/4/)
    expect(rendered).to match(/false/)
    expect(rendered).to match(/Mrt Line/)
  end
end
