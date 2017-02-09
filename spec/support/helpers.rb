module Helpers
    def log_in
      @user = create(:user)
      visit new_user_session_path
      fill_in "user_email", with: @user.email
      fill_in "user_password", with: @user.password
      click_button "Log in"
    end

    def add_pair_request
      fill_in "pair_request_project", with: "Another test project!"
      fill_in "pair_request_info", with: "some info"
      click_button "Add Listing"
    end

    def go_to_team_tasks
      click_button "Join Team!"
    end

    def add_task
      fill_in "task_name", with: "test the tests"
      fill_in "task_notes", with: "notes on testing the tests"
      click_button "Submit"
    end

end
