require 'rails_helper'

RSpec.describe "team tasks index page", type: :feature do
  before do
    log_in
    @other_user = create(:other_user)
    @team = build(:team)
    @team.users << @user
    @team.users << @other_user
    @task = build(:task)
    @team.tasks << @task
    @team.save
    visit team_tasks_path(@team)
  end

  it 'shows the task list' do
    expect(page).to have_content("to do")
    expect(page).to have_content("do the thing")
  end

  it 'can add a new task without assigning it to a user' do
    add_task
    click_button "Submit"
    expect(page).to have_content("test the tests")
  end

  it 'can assign joint tasks' do
    fill_in "task_name", with: "test the tests"
    fill_in "task_notes", with: "notes on testing the tests"
    check "task_user_ids_#{@user.id}"
    check "task_user_ids_#{@other_user.id}"
    click_button "Submit"
    expect(page).to have_content("test the tests")
    expect(page).to have_content("#{@user.name} and #{@other_user.name}")
  end

  it 'task can be claimed by user' do
    click_button "Claim Task"
    expect(page).not_to have_content("Claim Task")
  end

  it 'task can be marked complete' do
    click_button "Claim Task"
    click_button "Mark Complete"
    expect(page).to have_content("Completed!")
  end

  it 'task can be edited' do
    click_link "edit_#{@task.id}"
    fill_in "task_name", with: "do the other thing"
    click_button "Submit"
    expect(page).to have_content("do the other thing")
  end

  it 'task can be deleted' do
    click_button "delete_#{@task.id}"
    expect(page).not_to have_content(@task.name)
  end

  it 'shows all tasks by default' do
    add_task
    add_task
    expect(page).to have_selector("a#edit_#{@task.id}")
    expect(page).to have_selector("a#edit_#{@task.id + 1}")
    expect(page).to have_selector("a#edit_#{@task.id + 2}")
  end

  it 'can show only incomplete tasks' do
    add_task
    click_button "claim_#{@task.id}"
    click_button "complete_#{@task.id}"
    click_link "INCOMPLETE"
    expect(page).not_to have_content(@task.name)
  end

  it 'can show only tasks belonging to user' do
    add_task
    click_button "claim_#{@task.id}"
    click_link "MY TASKS"
    expect(page).not_to have_content("test the tests")
  end

end
