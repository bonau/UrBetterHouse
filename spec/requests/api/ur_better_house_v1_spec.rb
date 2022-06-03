require 'rails_helper'

describe UrBetterHouse::APIv1 do
    include Rack::Test::Methods

    def app
        UrBetterHouse::APIv1
    end

    def valid_user
        {
            email: "theone@example.com",
            password: "yesthatsright",
            password_confirmation: "yesthatsright"
        }
    end

    context 'GET /v1/residentials' do
        it 'return a list of residentials' do
            get '/v1/residentials'
            expect(last_response.successful?).to eq(true)
            expect(last_response.content_type).to eq('application/json')
        end
    end

    context 'POST /v1/user/sign_in' do
        it 'return status 200' do
            User.create(valid_user)
            json = valid_user.to_json
            post('/v1/users/sign_in', json, {"CONTENT_TYPE" => "application/json"})
            expect(last_response.successful?).to eq(true) # TODO parse JSON
        end
    end
end