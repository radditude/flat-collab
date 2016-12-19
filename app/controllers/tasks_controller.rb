class TasksController < ApplicationController
  before_action :user_logged_in?, :current_users_team?

  def index
    @team = current_team
    @task = Task.new
    
    if view_incomplete
      @tasks = current_team.tasks.incomplete
    elsif view_my_tasks
      @tasks = current_user.tasks.where("team_id = ?", current_team.id)
    else
      @tasks = current_team.tasks.persisted
    end
  end

  def create
    @team = current_team
    @task = @team.tasks.new(task_params)
    @task.status = "claimed" unless @task.users.empty?

    if @task.save
      redirect_to team_tasks_path(@team)
    else
      @tasks = @team.tasks.persisted
      render :index
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

  def edit
    @team = current_team
    @task = current_task
  end

  def update
    if current_task.update(task_params)
      redirect_to team_tasks_path(current_team)
    else
      render 'edit'
    end
  end

  def destroy
    current_task.destroy
    redirect_to team_tasks_path(current_team)
  end

  private

  def view
    params[:view]
  end
  
  def view_incomplete
    view == "incomplete"
  end
  
  def view_my_tasks
    view == "my_tasks"
  end

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
    params.require(:task).permit(:name, :notes, :user_ids => [])
  end

end
