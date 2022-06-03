require 'rails_helper'

describe UrBetterHouse::APIv1 do
    include Rack::Test::Methods

    def app
        UrBetterHouse::APIv1
    end

    context 'GET /v1/residentials' do
        it 'return a list of residentials' do
            get '/v1/residentials'
            expect(last_response.successful?).to eq(true)
            expect(last_response.content_type).to eq('application/json')
        end
    end
end