require 'rails_helper'

RSpec.describe Team, type: :model do
  it 'has many users' do
    user1 = User.create(name: "test", email:"testy@test.com", password: "testtest")
    user2 = User.create(name: "another", email: "another@test.com", password: "anothertest")
    team = Team.create(name: "the best team")
    team.users << user1
    team.users << user2

    expect(team.users).to include(user1, user2)
  end

  it 'has many tasks' do
    team = Team.create(name: "the best team")
    task = team.tasks.create(name: "the task")
    task2 = team.tasks.create(name: "the other task")

    expect(team.tasks).to include(task, task2)
  end
end
