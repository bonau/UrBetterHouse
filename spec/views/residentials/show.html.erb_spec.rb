require 'rails_helper'

RSpec.describe "residentials/show", type: :view do
  before(:each) do
    @residential = assign(:residential, Residential.create!(
      thumb_pic: "https://urhouse.s3.amazonaws.com/images/rentals/e608961813ac47bc0cfbcac85dd2147f.jpg?31363436353736353837",
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
    expect(rendered).to match(/(https?:\/\/.*\.(?:png|jpg))/i)
    expect(rendered).to match(/Title/)
    expect(rendered).to match(/2/)
    expect(rendered).to match(/Address/)
    expect(rendered).to match(/3/)
    expect(rendered).to match(/4/)
    expect(rendered).to match(/false/)
    expect(rendered).to match(/Mrt Line/)
  end
end
