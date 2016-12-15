require 'rails_helper'

RSpec.describe Task, type: :model do
  before do
    @team = create(:team)
    @task = build(:task)
    @team.tasks << @task
    @task.save
    @team.save
  end

  it 'has a name and status' do
    expect(@task.name).to eql("do the thing")
    expect(@task.unclaimed?).to eql(true)
  end

  it 'belongs to a team' do
    expect(@task.team).to eql(@team)
  end

  it '#assign_user assigns the task to a user and gives it a status of claimed' do
    user = create(:user)
    @team.users << user
    @task.assign_user(user)
    expect(user.tasks).to include(@task)
    expect(@task.claimed?).to be(true)
  end

  it 'can be assigned to multiple users' do
    user = create(:user)
    other_user = create(:other_user)
    @task.assign_user(user)
    @task.assign_user(other_user)
    expect(@task.users).to include(user, other_user)
    expect(@task.claimed?).to be(true)
  end
end
