require 'rails_helper'

RSpec.describe User, type: :model do
  describe "Associations" do
    it 'has many PairRequests' do
      user = User.create(name: "Test", email: "testy@test.com", password: "passwordy")
      request = user.pair_requests.create(project: "A Lesson")

      expect(user.pair_requests).to include(request)
    end

    it 'has many Teams' do
      user = User.create(name: "test", email:"testy@test.com", password: "testtest")
      team = Team.create(name: "the best team")
      team2 = Team.create(name: "the also best team")
      user.teams << team
      user.teams << team2

      expect(user.teams).to include(team, team2)
    end

    it 'has many Tasks' do
      user = User.create(name: "test", email:"testy@test.com", password: "testtest")
      task = Task.create(name: "the task")
      task2 = Task.create(name: "the other task")
      task.assign_user(user)
      task2.assign_user(user)

      expect(user.tasks).to include(task, task2)
    end

  end
end
