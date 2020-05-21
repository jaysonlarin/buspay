Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '*path', to: 'homepage#index', constraints: -> (req) do
    !req.xhr? && req.format.html?
  end

  namespace :api do
    namespace :v1 do
      resources :items
    end
  end

  root 'homepage#index'
end
