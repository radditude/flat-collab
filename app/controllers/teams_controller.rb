class TeamsController < ApplicationController
  def create
    team = Team.create(team_params)
    redirect_to team_tasks_path(team)
  end

  private

  def team_params
    params.require(:team).permit(:name, :user_ids)
  end
end
