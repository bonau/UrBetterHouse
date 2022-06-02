require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe "/residentials", type: :request do
  
  # This should return the minimal set of attributes required to create a valid
  # Residential. As you add validations to Residential, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  describe "GET /index" do
    it "renders a successful response" do
      Residential.create! valid_attributes
      get residentials_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      residential = Residential.create! valid_attributes
      get residential_url(residential)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_residential_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "renders a successful response" do
      residential = Residential.create! valid_attributes
      get edit_residential_url(residential)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Residential" do
        expect {
          post residentials_url, params: { residential: valid_attributes }
        }.to change(Residential, :count).by(1)
      end

      it "redirects to the created residential" do
        post residentials_url, params: { residential: valid_attributes }
        expect(response).to redirect_to(residential_url(Residential.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Residential" do
        expect {
          post residentials_url, params: { residential: invalid_attributes }
        }.to change(Residential, :count).by(0)
      end

      it "renders a successful response (i.e. to display the 'new' template)" do
        post residentials_url, params: { residential: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested residential" do
        residential = Residential.create! valid_attributes
        patch residential_url(residential), params: { residential: new_attributes }
        residential.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the residential" do
        residential = Residential.create! valid_attributes
        patch residential_url(residential), params: { residential: new_attributes }
        residential.reload
        expect(response).to redirect_to(residential_url(residential))
      end
    end

    context "with invalid parameters" do
      it "renders a successful response (i.e. to display the 'edit' template)" do
        residential = Residential.create! valid_attributes
        patch residential_url(residential), params: { residential: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested residential" do
      residential = Residential.create! valid_attributes
      expect {
        delete residential_url(residential)
      }.to change(Residential, :count).by(-1)
    end

    it "redirects to the residentials list" do
      residential = Residential.create! valid_attributes
      delete residential_url(residential)
      expect(response).to redirect_to(residentials_url)
    end
  end
end
