Rails.application.routes.draw do
  root to: 'home#index'
  get 'home/index'
  mount UrBetterHouse::API => '/api'
  devise_for :admins
  devise_for :users
  resources :residentials
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
