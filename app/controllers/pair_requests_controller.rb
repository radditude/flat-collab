class PairRequestsController < ApplicationController
  def create
    current_user.pair_requests.create(pair_request_params)
    redirect_to root_path
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
