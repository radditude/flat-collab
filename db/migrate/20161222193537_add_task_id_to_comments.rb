class AddTaskIdToComments < ActiveRecord::Migration[5.0]
  def change
    add_column :comments, :task_id, :integer
  end
end
