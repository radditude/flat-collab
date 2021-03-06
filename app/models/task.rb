class Task < ApplicationRecord
  validates_presence_of :name

  enum status: [:unclaimed, :claimed, :complete]
  belongs_to :team
  has_many :user_tasks
  has_many :users, through: :user_tasks
  has_many :comments

  scope :incomplete, -> { where("status < 2")}
  scope :persisted, -> { where "id IS NOT NULL" }

  def complete_task
    self.status = "complete"
    self.save
  end

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

  def claimed
    !self.users.empty?
  end

  def display_users
    self.users.pluck(:name).to_sentence
  end
end
