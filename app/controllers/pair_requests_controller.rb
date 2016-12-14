class PairRequestsController < ApplicationController
  before_action :logged_in?

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
    @request = PairRequest.find(params[:id])
    @request.mark_inactive
    @request.save
    redirect_to root_path
  end

  def destroy
    @request = PairRequest.find(params[:id])
    @request.destroy
    redirect_to root_path
  end

  private

  def pair_request_params
    params.require(:pair_request).permit(:project, :info)
  end
end
