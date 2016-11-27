class CreatePairRequests < ActiveRecord::Migration[5.0]
  def change
    create_table :pair_requests do |t|
      t.string :project
      t.text :info
      t.integer :status, :default => 0
      t.integer :user_id
      t.timestamps
    end
  end
end
