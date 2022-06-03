require 'rails_helper'

describe UrBetterHouse::APIv1 do
    include Rack::Test::Methods

    def app
        UrBetterHouse::APIv1
    end

    context 'GET /' do
        it 'return "hello"' do
            get '/'
            expect(last_response.body).to eq('hello')
        end
    end
end