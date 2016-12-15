require 'rails_helper'

RSpec.describe User, type: :model do
    before do
      @user = create(:user)
    end

    it 'has many PairRequests' do
      @pair_request = build(:pair_request)
      @user.pair_requests << @pair_request

      expect(@user.pair_requests).to include(@pair_request)
    end

    it 'has many Teams' do
      team = build(:team)
      team2 = build(:team)
      @user.teams << team
      @user.teams << team2

      expect(@user.teams).to include(team, team2)
    end

    it 'has many Tasks' do
      team = build(:team)
      task = build(:task)
      task2 = build(:task)
      team.tasks << task
      team.tasks << task2
      task.assign_user(@user)
      task2.assign_user(@user)

      expect(@user.tasks).to include(task, task2)
    end
end
