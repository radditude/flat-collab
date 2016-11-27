require 'rails_helper'

RSpec.describe Task, type: :model do
  it 'has a name and status' do
    task = Task.new(name:"do the thing", status:"unclaimed")
    expect(task.name).to eql("do the thing")
    expect(task.unclaimed?).to eql(true)
  end

  it 'belongs to a team' do
    team = Team.create(name: "the best team")
    task = team.tasks.create(name:"do the thing", status: "unclaimed")
    expect(task.team).to eql(team)
  end

  it '#assign_user assigns the task to a user and gives it a status of claimed' do
    user = User.create(name: "test", email:"testy@test.com", password: "testtest")
    task = Task.create(name:"do the thing", status: "unclaimed")
    task.assign_user(user)
    expect(user.tasks).to include(task)
    expect(task.claimed?).to be(true)
  end

  it 'can be assigned to multiple users' do
    user = User.create(name: "test", email:"testy@test.com", password: "testtest")
    user2 = User.create(name: "another", email: "another@test.com", password: "anothertest")
    task = Task.create(name:"do the thing", status: "unclaimed")
    task.assign_user(user)
    task.assign_user(user2)
    expect(task.users).to include(user, user2)
    expect(task.claimed?).to be(true)
  end
end
