class PairRequest < ApplicationRecord
  validates_presence_of :project, :user_id, :on => create
  belongs_to :user

  enum status: [:active, :inactive]
end
