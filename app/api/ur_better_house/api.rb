module UrBetterHouse
    class API < Grape::API
        mount UrBetterHouse::API::V1 => '/v1'
    end
end