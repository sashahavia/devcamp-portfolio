Rails.application.routes.draw do
  resources :portfolios, except: [:show]
  get 'angular-items', to: 'portfolios#angular'

  get 'portfolio/:id', to: 'portfolios#show', as: 'portfolio_show'

  # changed 'pages/about' route to 'about'
  get 'about-me', to: 'pages#about'
  get 'contact', to: 'pages#contact'

  resources :blogs do
    member do
      get :toggle_status
    end
  end
  
  # changed this get 'pages/home' to root to
  root to: 'pages#home'
end
