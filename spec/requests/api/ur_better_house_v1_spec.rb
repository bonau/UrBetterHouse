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

    def valid_admin
        {
            email: "theadmin@example.com",
            password: "yesthatsright",
            password_confirmation: "yesthatsright",
            role: 'admin'
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
            city: "台北市",
            dist: "松山區",
            net_size: 30.0
        }
    end

    before do
        @user = User.create(valid_user)
        @admin = User.create(valid_admin)
        @residential = Residential.create(valid_residential)
        @like = @user.favorites.where(residential_id: @residential.id).first_or_create
    end

    context 'GET /v1/residentials' do
        it 'return a list of residentials' do
            get '/v1/residentials'
            expect(last_response.successful?).to eq(true)
            expect(last_response.content_type).to eq('application/json')
        end
    end

    context 'GET /v1/residentials with auth_token' do
        it 'return a list of residentials' do
            get '/v1/residentials', {auth_token: @user.authentication_token}
            expect(last_response.successful?).to eq(true)
            expect(last_response.content_type).to eq('application/json')
        end
    end

    context 'GET /v1/residentials with filters' do
        it 'return a list of residentials' do
            get '/v1/residentials', {filters: {city: "台北市"}} # TODO hardcode
            expect(last_response.successful?).to eq(true)
            expect(last_response.content_type).to eq('application/json')
            body = JSON.load(last_response.body)
            body["datas"].each do |data|
                expect(data["city"]).to eq("台北市")
            end
        end
    end

    context 'PUT /v1/residentials with params' do
        it 'return status code 200' do
            body = {price_per_month: 40000}.to_json
            put '/v1/residentials/%d' % @residential.id, body, {"CONTENT_TYPE" => "application/json"} # TODO hardcode
            expect(last_response.successful?).to eq(true)
            expect(last_response.content_type).to eq('application/json')
            data = JSON.load(last_response.body)
            expect(data).to have_key("status")
            expect(data["status"]).to eq(200)
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
            data = JSON.load(last_response.body)
            expect(data).to have_key("status")
            expect(data["status"]).to eq(200)
        end
    end

    context 'DELETE /v1/residentials/:id/like' do
        it 'return status code 200' do
            id = @residential.id
            key = Devise::TokenAuthenticatable.token_authentication_key
            token = @user.authentication_token
            size = Favorite.count
            delete '/v1/residentials/%d/like' % id, {key => token}
            expect(last_response.successful?).to eq(true)
            expect(last_response.content_type).to eq('application/json')
            data = JSON.load(last_response.body)
            expect(data).to have_key("status")
            expect(data["status"]).to eq(200)
            after_size = Favorite.count
            expect(after_size - size).to eq(-1)
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
            expect(data).to have_key("role")
            expect(data["role"]).not_to eq("admin")
        end
    end

    context 'POST /v1/user/sign_in' do
        it 'return status 200' do
            json = valid_admin.to_json
            post('/v1/users/sign_in', json, {"CONTENT_TYPE" => "application/json"})
            expect(last_response.successful?).to eq(true)
            # TODO parse JSON
            data = JSON.load(last_response.body)
            expect(data).to have_key("token")
            expect(data).to have_key("role")
            expect(data["role"]).to eq("admin")
        end
    end
end