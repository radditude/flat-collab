class TeamsController < ApplicationController
  def create
    @request = PairRequest.find(params[:id])
    @team = Team.create_from_pair_request(@request, current_user)
    @request.mark_inactive

    redirect_to team_tasks_path(@team)
  end
end
