class Portfolio < ApplicationRecord
  validates_presence_of :title, :body, :main_image, :thumb_image

  # Custom scope
  
  def self.angular
    where(subtitle: 'Angular')
  end

  # Other way of creating a scope
  
  scope :ruby_on_rails_portfolio_items, -> { where(subtitle: 'Ruby on Rails') }

end
