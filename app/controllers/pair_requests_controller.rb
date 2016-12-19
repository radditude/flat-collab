class PairRequestsController < ApplicationController
  before_action :user_logged_in?

  def create
    @request = current_user.pair_requests.new(pair_request_params)
    
    if @request.save
      redirect_to root_path
    else
      @requests = PairRequest.all.where(status: "active").persisted
      render 'index'
    end
  end

  def update
    @request = current_pair_request
    @request.mark_inactive
    redirect_to root_path
  end

  def destroy
    @request = current_pair_request
    @request.destroy
    redirect_to root_path
  end

  private

  def current_pair_request
    PairRequest.find(params[:id])
  end
  
  def pair_request_params
    params.require(:pair_request).permit(:project, :info)
  end
end
