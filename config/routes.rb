Rails.application.routes.draw do

  root 'welcome#home'

  resources :teams do
    resources :tasks do
      resources :comments, only: [:create]
    end
  end

  patch '/teams/:team_id/tasks/:id/claim', to: "tasks#claim", as: "claim_task"

  patch '/teams/:team_id/tasks/:id/complete', to: "tasks#complete", as: "complete_task"

  post '/pair_requests/:id/create-team', to: "teams#create", as: "create_team"

  resources :pair_requests, only: [:index, :create, :update, :destroy]

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
