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
    deleteTaskButtons();
    claimTaskButtons();
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

// written (almost) without using ES6 class syntax
// (more or less just to prove it works)
function Task(data) {
    // yeah, I know, this is ES6 syntax
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

Task.prototype.chooseButtonType = function() {
  if (this.belongsToUser() && this.status !== "complete") {
    return this.completeButton();
  } else if (this.status === "complete") {
    return this.completedTask();
  } else if (this.users.length > 0) {
    return "";
  } else {
    return this.claimButton();
  }
}

Task.prototype.completeButton = function() {
  return `<button class="mini ui complete blue button" data-id="${this.id}">Mark Complete</button>`;
}

Task.prototype.completedTask = function() {
  return `<button class="mini ui completed green button" data-id="${this.id}">Completed!</button>`;
}

Task.prototype.claimButton = function() {
  return `<button class="mini ui claim yellow button" data-id="${this.id}">Claim Task</button>`;
}

Task.prototype.deleteButton = function() {
  return `<button class="mini ui delete red icon button" data-id="${this.id}"><i class="remove icon"></i></button>`;
}

Task.prototype.formatButtons = function() {
  return `<div class="floating">${this.chooseButtonType()}${this.deleteButton()}</div>`;
}

Task.prototype.formatName = function() {
    return `<div class="caps small-header"><b>${this.name}</b>${this.getUsers()}</div>`;
}

Task.prototype.formatNotes = function() {
    return `<span class="blue-text">${this.notes}</span>`;
}

Task.prototype.formatHTML = function() {
    return `<div class="item" id="task${this.id}"><br><div class="content">${this.formatButtons()}${this.formatName()}${this.formatNotes()}</div><br></div>`;
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
        $.get(`/teams/${currentTeam}/tasks/load`, function(data) {
            $("#tasksGoHere").empty();
            $(data.tasks).each(function(index, task) {
                var thisTask = new Task(task);
                $("#tasksGoHere").prepend(thisTask.formatHTML());
            })
        })
    })
}

let deleteTaskButtons = function() {
  $("#tasksGoHere").on("click", ".delete", function() {
    var id = $(this).data("id");
    var url = `/teams/${currentTeam}/tasks/${id}`;
    $.ajax({
      url: url,
      method: "DELETE"
    }).done(function() {
      $(`#task${id}`).hide(500);
    });
  });
}

let claimTaskButtons = function() {
  $("#tasksGoHere").on("click", ".claim", function() {
    var id = $(this).data("id");
    var url = `/teams/${currentTeam}/tasks/${id}/claim`;
    $.ajax({
      url: url,
      method: "PATCH"
    }).done(function() {
      $(`#task${id} button.claim`).replaceWith(`<button class="mini ui complete blue button" data-id="${id}">Mark Complete</button>`);
    });
  })
}
