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

    def valid_residential
        {
            thumb_pic: "https://urhouse.s3.amazonaws.com/images/rentals/e608961813ac47bc0cfbcac85dd2147f.jpg?31363436353736353837",
            title: "方正宅",
            price_per_month: 30000,
            address: "台北市松山區南京東路三段",
            total_room: 1,
            livingroom: 1,
            has_mrt: true,
            mrt_line: "台北小巨蛋",
        }
    end

    before do
        @user = User.create(valid_user)
        @residential = Residential.create(valid_residential)
    end

    context 'GET /v1/residentials' do
        it 'return a list of residentials' do
            get '/v1/residentials'
            expect(last_response.successful?).to eq(true)
            expect(last_response.content_type).to eq('application/json')
        end
    end

    context 'GET /v1/residentials/:id' do
        it 'return a list of residentials' do
            id = @residential.id
            get '/v1/residentials/%d' % id
            expect(last_response.successful?).to eq(true)
            expect(last_response.content_type).to eq('application/json')
            # TODO parse JSON
            data = JSON.load(last_response.body)
            expect(data).to have_key("title")
        end
    end

    context 'POST /v1/residentials/:id/like' do
        it 'return status code 200' do
            id = @residential.id
            key = Devise::TokenAuthenticatable.token_authentication_key
            token = @user.authentication_token
            post '/v1/residentials/%d/like' % id, {key => token}
            expect(last_response.successful?).to eq(true)
            expect(last_response.content_type).to eq('application/json')
            # TODO parse JSON
            data = JSON.load(last_response.body)
            expect(data).to have_key("status")
        end
    end

    context 'POST /v1/residentials/:id/like' do
        it 'return status code 400' do
            id = @residential.id
            key = Devise::TokenAuthenticatable.token_authentication_key
            token = ''
            post '/v1/residentials/%d/like' % id, {key => token}
            expect(last_response.successful?).to eq(true)
            expect(last_response.content_type).to eq('application/json')
            # TODO parse JSON
            data = JSON.load(last_response.body)
            expect(data).to have_key("status")
            expect(data["status"]).to eq(400)
        end
    end

    context 'POST /v1/user/sign_in' do
        it 'return status 200' do
            json = valid_user.to_json
            post('/v1/users/sign_in', json, {"CONTENT_TYPE" => "application/json"})
            expect(last_response.successful?).to eq(true)
            # TODO parse JSON
            data = JSON.load(last_response.body)
            expect(data).to have_key("token")
        end
    end
end