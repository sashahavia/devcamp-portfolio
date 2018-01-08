Rails.application.routes.draw do
  resources :portfolios

  # changed 'pages/about' route to 'about'
  get 'about-me', to: 'pages#about'
  get 'contact', to: 'pages#contact'

  resources :blogs
  
  # changed this get 'pages/home' to root to
  root to: 'pages#home'
end
