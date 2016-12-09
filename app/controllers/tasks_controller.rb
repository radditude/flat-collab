class TasksController < ApplicationController
  def index
    @team = Team.find(params[:team_id])
    @task = Task.new
  end
  
  def create
    @team = Team.find(params[:team_id])
    @task = @team.tasks.new(task_params)
    if @task.save
      redirect_to team_tasks_path(@team)
    else
      render 'index'
    end
  end
  
  private
  
  def task_params
    params.require(:task).permit(:name, :notes)
  end
  
end
