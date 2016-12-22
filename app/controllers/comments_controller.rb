class CommentsController < ApplicationController
  def create

    @task = Task.find(params[:task_id])
    @task.comments.create(comment_params)

    redirect_to team_tasks_path(@task.team)
  end

  private

  def comment_params
    params.permit(:content)
  end
end
