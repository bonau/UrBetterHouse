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
                # TODO performance issue
                rs.favorites.where(user_id: options[:user_id]).size > 0
            end
        end
    end
    class APIv1 < Grape::API
        format :json

        helpers do
            def filter_normalize(filters)
                result = {}
                if filters.is_a?(String)
                    filters = Rack::Utils.parse_nested_query(filters)
                end
                filters.each do |k, v|
                    if v.is_a?(Hash) # range
                        # TODO parse object
                        result[k.to_s.underscore] = Range.new(*v.values)
                    else
                        result[k.to_s.underscore] = v if !v.nil? && !v.empty?
                    end
                end if filters
                result
            end

            def available_filters
                # TODO cannot present hash
                [{
                    city: ["台北市", "新北市"], # TODO hardcode
                    dist: available_dists(@filters["city"]),
                }]
            end

            def available_dists(city)
                Residential.where(city: city).pluck(:dist).uniq
            end
        end

        resource :residentials do
            before do
                @auth_key = Devise::TokenAuthenticatable.token_authentication_key
                @token = params[@auth_key]
                @auth_param = {@auth_key => @token}
                @user = User.find_for_token_authentication(@auth_param)
                @filters = filter_normalize(params[:filters])
            end

            params do
                optional :page
                optional :filters
                optional :id
                optional @auth_key
            end
            get '/' do
                page = (params[:page] || 1).to_i
                rs = Residential.filter_by(@filters).page(page).per(6) # TODO configure residentials per page
                present :total_page, rs.total_pages
                present :per_page, 6
                present :datas, rs, with: UrBetterHouse::Entities::Residential, user_id: (@user.id if @user)
                present :available_filters, available_filters
            end
            get '/:id' do
                rs = Residential.where(id: params[:id].to_i).first
                present rs, with: UrBetterHouse::Entities::Residential
            end
            put '/:id' do
                rs = Residential.where(id: params[:id].to_i).first
                if rs
                    if rs.update_attributes(params) # TODO permit params
                        present({status: 200})
                    else
                        present({status: 500})
                    end
                else
                    present({status: 404})
                end
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
                        present({status: 200, token: user.authentication_token, role: user.role})
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