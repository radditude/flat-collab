/* global $ */

$(document).ready(function() {
  loadTeamsMenu();
  loadPairRequests();
  attachListeners();
})

var currentTeam;
var currentTask;
var commentForm;

// ES6 syntax
class PairRequest {
  constructor(data) {
    Object.assign(this, data);
  }

  postedAt() {
    var date = new Date(this.updated_at);
    var day = date.getDate();
    var month = date.getMonth();
    return `<p class="small italic">Posted ${month + 1}/${day}</p>`;
  }

  formatTitle() {
    return `<div class="header">${this.user.name} is looking for a parter for ${this.project}</div><br>`;
  }

  formatInfo() {
    return `${this.info}`;
  }

  loadButton() {
    // TODO: render button as "mark inactive" if pair request belongs to user
    if (currentUser.id === this.user.id) {
      return `<button class="js-mark small ui red button" data-id="${this.id}">Mark Inactive</button>`;
    } else {
      return `<button class="js-join small ui blue button" data-id="${this.id}">Join Team!</button>`;
    }
  }

  formatHTML() {
    return `<div class="item" id="pr-${this.id}"><br><div class="content">${this.formatTitle()} ${this.formatInfo()} ${this.postedAt()} ${this.loadButton()}</div><br></div>`;
  }
}

class Team {
  constructor(data) {
    Object.assign(this, data);
  }

  formatHTML() {
    return `<a class="item js-team" href="#" data-id="${this.id}">${this.name}</a>`;
  }

}

let loadPairRequests = function() {
  $.get("/pair_requests", function(data) {
    var posts = data.pair_requests;
    $(posts).each(function(index, post) {
      var thisPost = new PairRequest(post);
      $("#pairRequests").prepend(thisPost.formatHTML());
    });
  })
}

let loadTeamsMenu = function() {
  $.get("/teams", function(data) {
    var teams = data.teams;
    $(teams).each(function(index, team) {
      var theTeam = new Team(team);
      $("#teamsMenu").append(theTeam.formatHTML());
    })
  })
}

let submitPRForm = function() {
  $("#newPairRequest").submit(function(e) {
    e.preventDefault();
    var values = $(this).serialize();
    var postRequest = $.post("/pair_requests", values);
    postRequest.done(function(data) {
      var thisPost = new PairRequest(data.pair_request);
      $("#pairRequests").prepend(thisPost.formatHTML());
    });
    this.reset();
  });
}

let joinButton = function() {
  $("#pairRequests").on("click", ".js-join", function() {
    var id = $(this).data("id");
    var url = `/pair_requests/${id}/create-team`;
    var postRequest = $.post(url);
    postRequest.done(function(data) {
      var id = data.team.id;
      loadTeamTasks(id);
    })
  })
}


let teamMenuItems = function() {
  $("#teamsMenu").on("click", ".js-team", function(e) {
    e.preventDefault();
    var id = $(this).data("id");
    loadTeamTasks(id);
  })
}

let markInactiveButton = function() {
  $("#pairRequests").on("click", ".js-mark", function() {
    var id = $(this).data("id");
    var url = `/pair_requests/${id}`;
    $.ajax({
      url: url,
      method: "PATCH"
    }).done(function() {
      $(`#pr-${id}`).hide(500);
    })
  })
}

let dropdownMenu = function() {
  $('.menu > .ui.dropdown').click(function() {
    $(this).dropdown();
  })
}

let attachListeners = function() {
  submitPRForm();
  joinButton();
  markInactiveButton();
  dropdownMenu();
  teamMenuItems();
}



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

let attachTeamTasksListeners = function() {
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
    return `<div class="caps small-header"><b>${this.name}</b><span id="userNames">${this.getUsers()}</span></div>`;
}

Task.prototype.formatNotes = function() {
    return `<span class="blue-text">${this.notes}</span>`;
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

Task.prototype.formatHTML = function() {
  var html = '<div class="ui divider"></div>';
  html += `<div class="item" id="task${this.id}"><br><div class="content">`;
  html += `${this.formatButtons()}${this.formatName()}${this.formatNotes()}${this.formatCommentsList()}`;
  html += `</div><br></div>`;
  return html;
}

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
      debugger;
      console.log(response);
      $(`#task${id} button.claim`).replaceWith(`<button class="mini ui complete blue button" data-id="${id}">Mark Complete</button>`);
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
