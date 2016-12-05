class Team < ApplicationRecord
  validates_presence_of :name, :on => create

  has_many :user_teams
  has_many :users, through: :user_teams
  has_many :tasks

  def user_ids=(ids)
    ids_array = ids.split(", ")
    ids_array.each do |id|
      user = User.find(id)
      self.users << user
    end
    self.save
  end
end
