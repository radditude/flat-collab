require 'rails_helper'

RSpec.describe PairRequest, type: :model do
  before do
    @user = create(:user)
    @request = build(:pair_request)
    @request.user = @user
  end

  it 'belongs to a user' do
    expect(@request.user).to eql(@user)
  end

  it 'has a default status of active' do
    expect(@request.status).to eql('active')
  end

  it 'can be set to inactive' do
    @request.status = "inactive"

    expect(@request.active?).to be(false)
  end
end
