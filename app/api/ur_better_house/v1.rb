module UrBetterHouse
    module Entities
        class Residential < Grape::Entity
            expose :thumb_pic
            expose :title
            expose :address
            expose :price_per_month
            expose :mrt_line
            expose :livingroom
            expose :total_room
        end
    end
    class APIv1 < Grape::API
        format :json
        resource :residentials do
            params do
                optional :page
            end
            get '/' do
                page = (params[:page] || 1).to_i
                rs = Residential.page(page).per(6) # TODO configure residentials per page
                present rs, with: UrBetterHouse::Entities::Residential
            end
        end
    end
end