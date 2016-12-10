class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable,
  :validatable, :omniauthable, :omniauth_providers => [:github]

  validates_presence_of :name

  # Associations
  has_many :pair_requests
  has_many :user_teams
  has_many :teams, through: :user_teams
  has_many :user_tasks
  has_many :tasks, through: :user_tasks

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.name = auth.info.name   # assuming the user model has a name
      # user.image = auth.info.image # assuming the user model has an image
    end
  end
end
