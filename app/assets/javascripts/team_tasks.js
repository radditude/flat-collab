/* global $ */

var currentTeam;

let loadTeamTasks = function(teamId) {

  var url = `/teams/${teamId}/tasks`
  $("#text-container").load(url + " #htmlGoesHere", function() {
      currentTeam = teamId;
      loadTaskList(url);
      attachTeamTasksListeners();
  });
}

let attachTeamTasksListeners = function() {
    submitTaskForm();
    myTasksButton();
    incompleteTasksButton();
    allTasksButton();
}

let loadTaskList = function(url) {
  $.get(url + "/load", function(response) {
    $(response.tasks).each(function(index, task) {
        var thisTask = new Task(task);
        var html = thisTask.formatHTML();
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
        return ` &mdash; ${this.users[0].name} & ${this.users[1].name}`;
    } else if (this.users.length === 1) {
        return ` &mdash; ${this.users[0].name}`;
    } else {
        return "";
    }
}

Task.prototype.belongsToUser = function() {
  var l = this.users.length;
  for (var i = 0; i < l; i++) {
    if (this.users[i].id === currentUser.id) {
      return true;
    }
  }
  return false;
}

Task.prototype.deleteButton = function() {
  return `<button class="mini ui delete red icon button" data-id="${this.id}"><i class="remove icon"></i></button>`
}

Task.prototype.formatButtons = function() {
  return `<div class="floating">${this.deleteButton()}</div>`
}

Task.prototype.formatName = function() {
    return `<div class="caps small-header"><b>${this.name}</b>${this.getUsers()}</div>`;
}

Task.prototype.formatNotes = function() {
    return `<span class="blue-text">${this.notes}</span>`;
}

Task.prototype.formatHTML = function() {
    return `<div class="item"><br><div class="content">${this.formatButtons()}${this.formatName()}${this.formatNotes()}</div><br></div>`;
}

let submitTaskForm = function() {
  $("#submitTaskForm").click(function(e) {
    e.preventDefault();
    var values = $("form#newTaskForm").serialize();
    var postRequest = $.post(`/teams/${currentTeam}/tasks`, values);
    postRequest.done(function(data) {
      var thisTask = new Task(data.task);
      $("#tasksGoHere").prepend(thisTask.formatHTML());
      $("form#newTaskForm")[0].reset();
    });
  });
}

let myTasksButton = function() {
    $("#myTasks").click(function(e) {
        e.preventDefault();
        $.get(`/teams/${currentTeam}/tasks/user_tasks`, function(data) {
            $("#tasksGoHere").empty();
            $(data.tasks).each(function(index, task) {
                var thisTask = new Task(task);
                $("#tasksGoHere").prepend(thisTask.formatHTML());
            })
        })
    })
}

let incompleteTasksButton = function() {
    $("#incompleteTasks").click(function(e) {
        e.preventDefault();
        $.get(`/teams/${currentTeam}/tasks/incomplete`, function(data) {
            $("#tasksGoHere").empty();
            $(data.tasks).each(function(index, task) {
                var thisTask = new Task(task);
                $("#tasksGoHere").prepend(thisTask.formatHTML());
            })
        })
    })
}

let allTasksButton = function() {
    $("#allTasks").click(function(e) {
        e.preventDefault();
        $.get(`/teams/${currentTeam}/tasks`, function(data) {
            $("#tasksGoHere").empty();
            $(data.tasks).each(function(index, task) {
                var thisTask = new Task(task);
                $("#tasksGoHere").prepend(thisTask.formatHTML());
            })
        })
    })
}
