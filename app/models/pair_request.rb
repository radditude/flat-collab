class PairRequest < ApplicationRecord
  validates_presence_of :project, :user_id
  belongs_to :user

  enum status: [:active, :inactive]
end
