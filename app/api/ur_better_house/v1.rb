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
                present :total_page, rs.total_pages
                present :per_page, 6
                present :datas, rs, with: UrBetterHouse::Entities::Residential
            end
        end

        namespace :users do
            params do
                requires :email
                requires :password
            end

            post '/sign_in' do
                user = User.where(email: params[:email]).first
                if user && user.valid_password?(params[:password])
                    user.ensure_authentication_token!
                    if user.save
                        present({status: 200, token: user.authentication_token})
                    else
                        present({status: 500})
                    end
                else
                    present({status: 400})
                end
            end
        end
    end
end