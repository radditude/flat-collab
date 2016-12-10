class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def user_ids=(ids)
    if ids.is_a?(String)
      ids_array = ids.to_str.split(", ")
    else
      ids_array = ids
    end

    ids_array.each do |id|
      user = User.find(id)
      self.users << user
    end
    self.save
  end
end
