class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :notes
      t.integer :status, :default => 0
      t.datetime :finish_by
      t.integer :team_id, null: false
      t.timestamps
    end
  end
end
