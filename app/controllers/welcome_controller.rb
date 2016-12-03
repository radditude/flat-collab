class WelcomeController < ApplicationController
  def home
    if current_user
      @request = PairRequest.new
      @requests = PairRequest.all.where(status: "active")
      render 'pair_requests/index'
    else
      render 'home'
    end
  end
end
