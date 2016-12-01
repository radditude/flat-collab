require 'rails_helper'

RSpec.describe "User Home page slash request index page", type: :feature do
  before do
    @user = User.create(name: "Lane Kim", email: "lane@hepalien.com", password: "passwordy")
    @request = @user.pair_requests.create(project: "Flatiron Store", info: "parter needed!")
    visit new_user_session_path
    fill_in "user_email", with: @user.email
    fill_in "user_password", with: @user.password
    click_button "Log in"
  end

  it 'redirects to the pair requests index page when logged in' do
    expect(page).to have_content(@user.name)
  end

  it 'shows all active pair requests' do
    expect(page).to have_content(@request.project)
  end
end
