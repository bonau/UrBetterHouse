module UrBetterHouse
    module Entities
        class Residential < Grape::Entity
            expose :id
            expose :thumb_pic
            expose :title
            expose :address
            expose :price_per_month
            expose :mrt_line
            expose :livingroom
            expose :total_room
            expose :city
            expose :dist
            expose :net_size
            expose :liked do |rs, option|
                rs.favorites.where(user_id: options[:user_id]).size > 0
            end
        end
    end
    class APIv1 < Grape::API
        format :json

        helpers do
            def filter_normalize(filters)
                result = {}
                filters.each do |k, v|
                    result[k.to_s.underscore] = v
                end if filters
                result
            end
        end

        resource :residentials do
            before do
                @auth_key = Devise::TokenAuthenticatable.token_authentication_key
                @token = params[@auth_key]
                @auth_param = {@auth_key => @token}
                @user = User.find_for_token_authentication(@auth_param)
            end

            params do
                optional :page
                optional :filters
                optional :id
                optional @auth_key
            end
            get '/' do
                page = (params[:page] || 1).to_i
                filters = filter_normalize(params[:filters])
                rs = Residential.filter_by(filters).page(page).per(6) # TODO configure residentials per page
                present :total_page, rs.total_pages
                present :per_page, 6
                present :datas, rs, with: UrBetterHouse::Entities::Residential, user_id: (@user.id if @user)
            end
            get '/:id' do
                rs = Residential.where(id: params[:id].to_i).first
                present rs, with: UrBetterHouse::Entities::Residential
            end
            post '/:id/like' do
                result = @user.favorites.find_or_create_by(residential_id: params[:id].to_i) if @user
                if result
                    present({status: 200})
                else
                    present({status: 400})
                end
            end
            delete '/:id/like' do
                result = @user.favorites.where(residential_id: params[:id].to_i).first if @user
                if result
                    if result.destroy
                        present({status: 200})
                    else
                        present({status: 500})
                    end
                else
                    present({status: 400})
                end
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