class WelcomeController < ApplicationController
  def home
    if current_user
      @request = PairRequest.new
      @requests = PairRequest.all.where(status: "active").persisted.order("created_at DESC")
      render 'pair_requests/index'
    else
      render 'home'
    end
  end
end
