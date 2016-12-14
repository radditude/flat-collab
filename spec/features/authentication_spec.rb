require 'rails_helper'

RSpec.describe "User Registration and Login", type: :feature do

  describe "Home Page" do
    it 'has links to sign in or sign up' do
      visit root_path
      expect(page).to have_content('Sign In')
      expect(page).to have_content('Sign Up')
      expect(page).to have_content('Sign In with Github')
    end
  end

  describe "Signup Page" do
    it 'does not allow a user to sign up without an email' do
      visit new_user_registration_path
      fill_in "user_name", with: "Test"
      fill_in "user_password", with: "passwordy"
      fill_in "user_password_confirmation", with: "passwordy"
      click_button "Sign up"
      expect(page).to have_content("Email can't be blank")
    end

    it 'does not allow a user to sign up without a password' do
      visit new_user_registration_path
      fill_in "user_email", with: "test@testy.com"
      click_button "Sign up"
      expect(page).to have_content("Password can't be blank")
    end

    it 'allows a user to sign up with an email and password' do
      visit new_user_registration_path
      fill_in "user_name", with: "Test"
      fill_in "user_email", with: "test@testy.com"
      fill_in "user_password", with: "passwordy"
      fill_in "user_password_confirmation", with: "passwordy"
      click_button "Sign up"
      expect(page).not_to have_content("Sign Up")
    end
  end

  describe "Logging In" do
    it 'does not allow a user to log in without credentials' do
      user = create(:user)
      
      visit new_user_session_path
      click_button "Log in"
      expect(page).to have_content("Sign Up")
    end

    it 'allows a user to log in with correct credentials' do
      log_in
      
      expect(page).not_to have_content("Sign Up")
    end
  end

end
