require 'rails_helper'

RSpec.describe "User Home page slash request index page", type: :feature do
  before do
    log_in
  end

  it 'redirects to the pair requests index page when logged in' do
    expect(page).to have_content(@user.name)
  end

  it 'shows all active pair requests' do
    expect(page).to have_content(@request.project)
  end
end
