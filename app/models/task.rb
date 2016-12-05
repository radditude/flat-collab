class Task < ApplicationRecord
  validates_presence_of :name

  enum status: [:unclaimed, :claimed, :complete]
  belongs_to :team
  has_many :user_tasks
  has_many :users, through: :user_tasks

  def assigned_to?(user)
    if self.users.include?(user)
      true
    else
      false
    end
  end

  def assign_user(user)
    self.users << user
    self.status = "claimed"
    self.save
  end
end
