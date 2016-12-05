Rails.application.routes.draw do

  root 'welcome#home'

  resources :teams do
    resources :tasks
  end

  resources :pair_requests, only: [:create, :update, :destroy]

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks", :registrations => 'registrations' }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
