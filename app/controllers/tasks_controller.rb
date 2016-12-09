class TasksController < ApplicationController
  before_filter :logged_in?, :current_users_team?

  def index
    @team = current_team
    @task = Task.new
  end

  def create
    @team = current_team
    @task = @team.tasks.new(task_params)
    if @task.save
      redirect_to team_tasks_path(@team)
    else
      render 'index'
    end
  end

  def claim
    current_task.assign_user(current_user)
    redirect_to team_tasks_path(current_team)
  end

  def complete
    current_task.complete_task
    redirect_to team_tasks_path(current_team)
  end

  private

  def current_users_team?
    if !current_team.users.include?(current_user)
      redirect_to root_path
    end
  end

  def current_team
    Team.find(params[:team_id])
  end

  def current_task
    current_team.tasks.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :notes)
  end

end
