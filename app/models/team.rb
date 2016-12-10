class Team < ApplicationRecord
  validates_presence_of :name, :on => create

  has_many :user_teams
  has_many :users, through: :user_teams
  has_many :tasks
end
