class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :notes, :updated_at
  belongs_to :users
  has_many :comments
end
