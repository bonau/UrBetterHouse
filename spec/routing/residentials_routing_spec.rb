require "rails_helper"

RSpec.describe ResidentialsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/residentials").to route_to("residentials#index")
    end

    it "routes to #new" do
      expect(get: "/residentials/new").to route_to("residentials#new")
    end

    it "routes to #show" do
      expect(get: "/residentials/1").to route_to("residentials#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/residentials/1/edit").to route_to("residentials#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/residentials").to route_to("residentials#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/residentials/1").to route_to("residentials#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/residentials/1").to route_to("residentials#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/residentials/1").to route_to("residentials#destroy", id: "1")
    end
  end
end
