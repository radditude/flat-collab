/* global $ */

let loadTeamTasks = function(teamId) {
  var url = `/teams/${teamId}/tasks`
  $("#htmlGoesHere").load(url + " #htmlGoesHere");
  loadTaskList(url);
}

let loadTaskList = function(url) {
  $.get(url + "/load", function(response) {
    $(response.tasks).each(function(index, task) {
        var thisTask = new Task(task);
        console.log(thisTask);
    })
  })
}

// object constructor + methods without using ES6 class syntax
function Task(data) {
    Object.assign(this, data);
}

Task.prototype.getUsers = function() {
    if (this.users.length === 2) {
        return `${this.users[0].name} & ${this.users[1].name}`;
    } else if (this.users.length === 1) {
        return `${this.users[0].name}`;
    } else {
        return undefined;
    }
}
