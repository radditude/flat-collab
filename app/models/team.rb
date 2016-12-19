class Team < ApplicationRecord
  validates_presence_of :name, :on => create

  has_many :user_teams
  has_many :users, through: :user_teams
  has_many :tasks

  def self.create_from_pair_request(pair_request, other_user)
    team = self.new(name: pair_request.project)
    team.users << pair_request.user
    team.users << other_user
    team.save
    team
  end
end
