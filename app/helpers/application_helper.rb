module ApplicationHelper
    def logged_in
        @current_user ||= current_user
    end
    
end
