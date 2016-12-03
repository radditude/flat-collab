class PairRequest < ApplicationRecord
  validates_presence_of :project, :user_id
  belongs_to :user

  enum status: [:active, :inactive]

  def mark_inactive
    if self.active?
      self.status = "inactive"
    end
  end
end
