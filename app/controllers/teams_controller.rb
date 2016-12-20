class TeamsController < ApplicationController
  def create
    @request = PairRequest.find(params[:id])
    @team = Team.create_from_pair_request(@request, current_user)
    @request.mark_inactive

    redirect_to team_tasks_path(@team)
  end

  def edit
    @team = Team.find(params[:id])
  end

  def update
    @team = Team.find(params[:id])
    @association = @team.user_teams.find_by(user_id: current_user.id)
    @association.destroy
    redirect_to root_path
  end
end
