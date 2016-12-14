FactoryGirl.define do
    factory :pair_request do
        project "Test Project!"
        info "the best project!"
        association :user, factory: :other_user
    end
end