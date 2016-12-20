# FlatCollab

I built FlatCollab for my fellow students at the Flatiron School - we have a number of group projects as part of the curriculum, but since we online students are scattered across different countries, time zones, and schedules, it's not always easy to find partners.

FlatCollab is a Rails app that aims to address this by providing a sort of virtual bulletin board, where students can sign up through Github or with an email address and post about the project they'd like to find a partner for. Once a student chooses a partner, the two of them get access to a versatile task list for the project, with the ability to divide up the work involved and decide who's going to do what.

Hopefully, the process of finding a partner and working on a project together will be a little easier.

# Usage

The live version of this app lives at [flat-collab.herokuapp.com](https://flat-collab.herokuapp.com/). The code is viewable at [github.com/radditude/flat-collab](https://github.com/radditude/flat-collab).

# Development

Clone the repository and run `bundle install` to install the required gems and dependencies, `rake db:create` to create the database, then `rake db:migrate` to run the migrations. Run `rspec` to run the test suite.

To see a local version of the app, run `rails server`, then navigate to `localhost:3000` in your browser. Make your changes in `flat-collab/app` and refresh the page to see them in action.

# Contributing

Bug reports and pull requests are welcome on GitHub at [github.com/radditude/flat-collab](https://github.com/radditude/flat-collab). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

# License

This software is available as open source under the terms of the MIT License.
