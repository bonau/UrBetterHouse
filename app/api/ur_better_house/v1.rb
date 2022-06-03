module UrBetterHouse
    class APIv1 < Grape::API
        get '/' do
            'hello'
        end
    end
end