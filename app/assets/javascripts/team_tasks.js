/* global $ */

let loadTeamTasks = function(teamId) {
  var url = `/teams/${teamId}/tasks`
  $("#text-container").load(url + " #htmlGoesHere", function() {
      loadTaskList(url);
  })
}

let loadTaskList = function(url) {
  $.get(url + "/load", function(response) {
    $(response.tasks).each(function(index, task) {
        var thisTask = new Task(task);
        var html = thisTask.formatHTML();
        // debugger;
        $("#tasksGoHere").prepend(html);
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

Task.prototype.formatName = function() {
    return `<div class="caps small-header">${this.name} &mdash; ${this.getUsers()}</div>`;
}

Task.prototype.formatHTML = function() {
    return `<div class="item"><br><div class="content">${this.formatName()}</div><br></div>`;
}
