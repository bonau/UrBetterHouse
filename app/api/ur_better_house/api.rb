require_relative 'v1'

module UrBetterHouse
    class API < Grape::API
        mount UrBetterHouse::APIv1 => '/v1'
    end
end