# Specifications for the Rails with jQuery Assessment

Specs:
- [x] Use jQuery for implementing new requirements
- [x] Include a show resource rendered using jQuery and an Active Model Serialization JSON backend.

_The show task view is rendered with jQuery/AJAX._

- [x] Include an index resource rendered using jQuery and an Active Model Serialization JSON backend.

_The tasks index and the pair_requests index on the home page are both loaded via AJAX/JSON._

- [x] Include at least one has_many relationship in information rendered via JSON and appended to the DOM.

_Tasks have many users and many comments, both of which are rendered via JSON._

- [x] Include at least one link that loads or updates a resource without reloading the page.

_The join task button, the team navigation menu, the show task link, and the "back to full list" link all render via jQuery without a page reload._

- [x] Translate JSON responses into js model objects.

_Pair requests and teams are translated into ES6 classes, tasks are translated into more traditional JS objects._

- [x] At least one of the js model objects must have at least one method added by your code to the prototype.

_Pair requests, teams, and tasks all have methods added to the prototype._

Confirm
- [x] You have a large number of small Git commits

_129 commits and four branches as of this writing!_

- [x] Your commit messages are meaningful
- [x] You made the changes in a commit that relate to the commit message
- [x] You don't include changes in a commit that aren't related to the commit message
