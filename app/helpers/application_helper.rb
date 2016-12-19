module ApplicationHelper
    def logged_in
        @current_user ||= current_user
    end
    
    def show_updated_at(object)
        object.updated_at.strftime("%A, %B %e")
    end
end
