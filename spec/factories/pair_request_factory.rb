FactoryGirl.define do
    factory :pair_request do
        project "Test Project!"
        info "the best project"
        user_id user.id
    end
end