class TaskIndexSerializer < ActiveModel::Serializer
  attributes :id, :name, :notes, :updated_at
  belongs_to :users
end
