require 'rails_helper'

RSpec.describe PairRequest, type: :model do
  it 'belongs to a user' do
    user = User.create(name: "Test", email: "testy@test.com", password: "passwordy")
    request = user.pair_requests.create(project: "A Lesson")

    expect(request.user).to eql(user)
  end

  it 'has a default status of active' do
    user = User.create(name: "Test", email: "testy@test.com", password: "passwordy")
    request = user.pair_requests.create(project: "A Lesson")

    expect(request.status).to eql('active')
  end

  it 'can be set to inactive' do
    user = User.create(name: "Test", email: "testy@test.com", password: "passwordy")
    request = user.pair_requests.create(project: "A Lesson")
    request.status = "inactive"

    expect(request.active?).to be(false)
  end
end
