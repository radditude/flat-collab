class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def logged_in?
    if !current_user
      redirect_to root_path
    end
  end
end
