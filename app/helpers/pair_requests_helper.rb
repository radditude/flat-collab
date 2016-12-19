module PairRequestsHelper
     
     def belongs_to_user(thing)
         thing.user.id == current_user.id
     end
end
