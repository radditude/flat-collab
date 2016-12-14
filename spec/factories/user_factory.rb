FactoryGirl.define do
    factory :user do
        name "Test"
        email "test@testing.test"
        password "testpassword"
    end
    
    factory :other_user, class: User do
        name "Second"
        email "seconduser@second.com"
        password "secondtestpassword"
    end
end