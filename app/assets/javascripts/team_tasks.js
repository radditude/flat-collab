/* global $ */

var currentTeam;

let loadTeamTasks = function(teamId) {
  var url = `/teams/${teamId}/tasks`
  $("#text-container").load(url + " #htmlGoesHere", function() {
      loadTaskList(url);
  });
  var currentTeam = teamId;
}

let loadTaskList = function(url) {
  $.get(url + "/load", function(response) {
    $(response.tasks).each(function(index, task) {
        var thisTask = new Task(task);
        var html = thisTask.formatHTML();
        // debugger;
        $("#tasksGoHere").prepend(html);
    });
  });
}

// object constructor + methods without using ES6 class syntax
function Task(data) {
    Object.assign(this, data);
}

Task.prototype.getUsers = function() {
    if (this.users.length === 2) {
        return ` &mdash ${this.users[0].name} & ${this.users[1].name}`;
    } else if (this.users.length === 1) {
        return ` &mdash; ${this.users[0].name}`;
    } else {
        return "";
    }
}

Task.prototype.formatName = function() {
    return `<div class="caps small-header"><b>${this.name}</b>${this.getUsers()}</div>`;
}

Task.prototype.formatNotes = function() {
    return `<span class="blue-text">${this.notes}</span>`;
}

Task.prototype.formatHTML = function() {
    return `<div class="item"><br><div class="content">${this.formatName()}${this.formatNotes()}</div><br></div>`;
}

let submitTaskForm = function() {
  $("#newTaskForm").submit(function(e) {
    e.preventDefault();
    var values = $(this).serialize();
    $.ajax({
      url: `/teams/${currentTeam}/tasks`,
      method: "POST",
      data: values
    }).done(function(data) {
      console.log(data);
    })
    // var postRequest = $.post(`/teams/${currentTeam}/tasks`, values);
    // postRequest.done(function(data) {
    //     console.log(data);
    // //   var thisTask = new Task(data.task);
    // //   $("#pairRequests").prepend(thisTask.formatHTML());
    // });
    // this.reset();
  });
}
