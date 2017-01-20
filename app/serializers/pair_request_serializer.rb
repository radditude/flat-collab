class PairRequestSerializer < ActiveModel::Serializer
  attributes :id, :project, :info, :status
  belongs_to :user
end
