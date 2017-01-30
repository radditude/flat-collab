class PairRequestSerializer < ActiveModel::Serializer
  attributes :id, :project, :info, :updated_at
  belongs_to :user
end
