class CommentsController < ApplicationController
  def create

    @task = Task.find(params[:task_id])
    @comment = @task.comments.create(comment_params)
    render json: @comment
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end
end
