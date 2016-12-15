require 'rails_helper'

RSpec.describe Team, type: :model do
  before do
    @team = build(:team)
  end

  it 'has many users' do
    user = create(:user)
    other_user = create(:other_user)
    @team.users << user
    @team.users << other_user

    expect(@team.users).to include(user, other_user)
  end

  it 'has many tasks' do
    task = build(:task)
    task2 = build(:task)
    @team.tasks << task
    @team.tasks << task2

    expect(@team.tasks).to include(task, task2)
  end
end
