module DefaultPageContent
  extend ActiveSupport::Concern

  included do 
    before_action :set_page_defaults
  end

  def set_page_defaults
    @page_title = "Sasha Havia | My Portfolio Website"
    @seo_keywords = "Sasha Havia portfolio"
  end
end



