require 'rails_helper'

RSpec.describe "User Home page slash request index page", type: :feature do
  before do
    @request = create(:pair_request)
    log_in
  end

  it 'redirects to the pair requests index page when logged in', js: true do
    expect(page).to have_content(@user.name)
  end

  it 'shows all active pair requests' do

    expect(page).to have_content(@request.project)
  end

  it 'allows the user to add a new pair request' do
    add_pair_request

    expect(page).to have_content("Another test project!")
  end

  it 'allows the user to mark a pair request inactive' do
    add_pair_request
    click_button "Mark Inactive"

    expect(page).not_to have_content("Another test project!")
  end

  it 'allows the user to answer a listing' do
    click_button "Join Team!"

    expect(page).to have_content("to do")
  end
end
