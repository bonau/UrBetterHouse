require_relative 'v1'

module UrBetterHouse
    class API < Grape::API
        mount UrBetterHouse::APIv1
    end
end