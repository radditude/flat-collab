class TaskIndexSerializer < ActiveModel::Serializer
  attributes :id, :name, :notes, :updated_at, :status
  belongs_to :users
end
