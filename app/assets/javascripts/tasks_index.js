var currentTeam;
var currentTask;
var commentForm;

let attachListeners = function() {
  submitPRForm();
  joinButton();
  markInactiveButton();
  dropdownMenu();
  teamMenuItems();
}

// begin team_tasks view code


let loadTeamTasks = function(teamId) {
  var url = `/teams/${teamId}/tasks`;
  $("#text-container").load(url + " #htmlGoesHere", function() {
      currentTeam = teamId;
      loadTaskList(url);
      attachTeamTasksListeners();
  });
}

let loadEditTask = function(taskId) {
  var url = `/teams/${currentTeam}/tasks/${taskId}/edit`;
  $("#text-container").load(url + " #htmlGoesHere", function() {
    currentTask = taskId;
    attachEditTaskListener();
  })
}

let loadShowTask = function(taskId) {
  var url = `/teams/${currentTeam}/tasks/${taskId}`;
  $.get(url, function(data) {
    currentTask = taskId;
    var thisTask = new Task(data.task);
    var html = thisTask.formatHTML('show');
    $("#tasksGoHere").html(html);
    $("#menu").hide();
    $("#newTaskFormContainer").hide();
    $("#leave-team").hide();
    attachBackLinkListener();
  })
}

let attachTeamTasksListeners = function() {
    showTaskLinks();
    deleteTaskButtons();
    editTaskButtons();
    claimTaskButtons();
    completeTaskButtons();
    submitCommentForm();
    submitTaskForm();
    myTasksButton();
    incompleteTasksButton();
    allTasksButton();
}

let attachEditTaskListener = function() {
  $("form").on("submit", function(e) {
    e.preventDefault();
    var values = $("form").serialize();
    $.ajax({
      url: `/teams/${currentTeam}/tasks/${currentTask}`,
      method: "PATCH",
      data: values
    }).done(function() {
      loadTeamTasks(currentTeam);
    });
  })
}

let attachBackLinkListener = function() {
  $("#backToTasksIndex").on("click", function(e) {
    e.preventDefault();
    loadTeamTasks(currentTeam);
  });
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

// begin Task model object
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

Task.prototype.editButton = function() {
  return `<button class="mini ui editTask white icon button" data-id="${this.id}"><i class="edit icon"></i></button>`;
}

Task.prototype.deleteButton = function() {
  return `<button class="mini ui delete red icon button" data-id="${this.id}"><i class="remove icon"></i></button>`;
}

Task.prototype.formatButtons = function() {
  return `<div class="floating">${this.chooseButtonType()}${this.editButton()}${this.deleteButton()}</div>`;
}

Task.prototype.formatName = function() {
    return `<div class="caps small-header"><b><a class="blue-text showTask" href="#" data-id="${this.id}">${this.name}</a></b><span id="userNames">${this.getUsers()}</span></div>`;
}

Task.prototype.formatNotes = function() {
    return `<span class="blue-text">${this.notes}</span>`;
}

Task.prototype.formatBackLink = function() {
  return `<a id="backToTasksIndex" class="blue-text" href="#"><< Back to list</a>`;
}

Task.prototype.formatCommentsList = function() {
  var html = "<div class='ui bulleted list'>";
  var id = this.id;
  $(this.comments).each(function(index, comment) {
    html += formatComment(comment.content);
  });
  html += "</div>";
  html += loadCommentForm(id);
  return html;
}

Task.prototype.formatHTML = function(type) {
  if (type === 'show') {
    var html = `${this.formatBackLink()}`
    html += '<div class="ui divider"></div>';
    html += `<div class="item" id="task${this.id}"><br><div class="content">`;
    html += `<h2>${this.formatName()}</h2>`
    html += `${this.formatButtons()}${this.formatNotes()}${this.formatCommentsList()}`;
    html += `</div><br></div>`;
    return html;
  } else {
    var html = '<div class="ui divider"></div>';
    html += `<div class="item" id="task${this.id}"><br><div class="content">`;
    html += `${this.formatButtons()}${this.formatName()}${this.formatNotes()}${this.formatCommentsList()}`;
    html += `</div><br></div>`;
    return html;
  }

}

// end Task object methods

let formatComment = function(content) {
  return `<div class="item">${content}</div>`;
}

let loadCommentForm = function(id) {
  var authenticity_token = $('meta[name=csrf-token]').attr('content');
  var html = `<form class='ui inline comment form' id="task${id}-comment-form">`;
  html += `<input type='hidden' name='authenticity_token' value='${authenticity_token}'>`;
  html += "<div class='field'>"
  html += `<input type="text" name="comment[content]"></div>`;
  html += `<button type="submit" class="mini ui button commentButton" data-id="${id}">Add Comment</button>`;
  html += "</form>";
  return html;
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

let submitCommentForm = function() {
  $("#tasksGoHere").on("click", ".commentButton", function(e) {
    e.preventDefault();
    var id = $(this).data("id");
    var values = $(`#task${id}-comment-form`).serialize();
    var postRequest = $.post(`/teams/${currentTeam}/tasks/${id}/comments`, values);
    postRequest.done(function(data) {
      var html = formatComment(data.comment.content);
      $(`#task${id} .ui.bulleted.list`).append(html);
      $(`#task${id}-comment-form`)[0].reset();
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
    }).done(function(response) {
      var theTask = new Task(response.task);
      $(`#task${id} button.claim`).replaceWith(theTask.completeButton());
      $(`#task${id} #userNames`).html(theTask.getUsers());
    });
  })
}

let completeTaskButtons = function() {
  $("#tasksGoHere").on("click", ".complete", function() {
    var id = $(this).data("id");
    var url = `/teams/${currentTeam}/tasks/${id}/complete`;
    $.ajax({
      url: url,
      method: "PATCH"
    }).done(function() {
      $(`#task${id} button.complete`).replaceWith(`<button class="mini ui completed green button" data-id="${id}">Completed!</button>`);
    });
  })
}

let editTaskButtons = function() {
  $("#tasksGoHere").on("click", ".editTask", function() {
    var id = $(this).data("id");
    loadEditTask(id);
  })
}

let showTaskLinks = function() {
  $("#tasksGoHere").on("click", ".showTask", function() {
    var id = $(this).data("id");
    loadShowTask(id);
  })
}
