Rails.application.routes.draw do
  # API rotaları /api/v1 içerisinde olmalıdır
  namespace :api do
    namespace :v1 do
      get 'search/posts'
      resources :posts
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
