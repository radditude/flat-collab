require 'rails_helper'

RSpec.describe "team tasks index page", type: :feature do
  before do
    log_in
    @other_user = create(:other_user)
    @team = build(:team)
    @team.users << @user
    @team.users << @other_user
    @team.tasks << build(:task)
    @team.save
    visit team_tasks_path(@team)
  end

  it 'shows the task list' do
      expect(page).to have_content("to do")
      expect(page).to have_content("")
  end


end
