Rails.application.routes.draw do
  resources :recipes
  resources :users
  
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get '*path', to: "fallback#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
