var currentTeam; // set during loadTeamTasks
var currentTask; // set during loadEditTask and loadShowTask

let attachTeamTasksListeners = function() {
  // this gets called as part of the loadTeamTasks() function
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

// begin Task model object + methods
// written (almost) without using ES6 class syntax
// (more or less just to prove it works)
function Task(data) {
  // yeah, I know, this is ES6 syntax. I said almost!
  Object.assign(this, data);
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

Task.prototype.claimButton = function() {
  return `<button class="mini ui claim yellow button" data-id="${this.id}">Claim Task</button>`;
}

Task.prototype.completeButton = function() {
  return `<button class="mini ui complete blue button" data-id="${this.id}">Mark Complete</button>`;
}

Task.prototype.completedTask = function() {
  return `<button class="mini ui completed green button" data-id="${this.id}">Completed!</button>`;
}

Task.prototype.deleteButton = function() {
  return `<button class="mini ui delete red icon button" data-id="${this.id}"><i class="remove icon"></i></button>`;
}

Task.prototype.editButton = function() {
  return `<button class="mini ui editTask white icon button" data-id="${this.id}"><i class="edit icon"></i></button>`;
}

Task.prototype.formatBackLink = function() {
  return `<a id="backToTasksIndex" class="blue-text" href="#"><< Back to list</a>`;
}

Task.prototype.formatButtons = function() {
  return `<div class="floating">${this.chooseButtonType()}${this.editButton()}${this.deleteButton()}</div>`;
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

Task.prototype.formatName = function() {
  var html = `<div class="caps small-header">`;
  html += `<b><a class="blue-text showTask" href="#" data-id="${this.id}">${this.name}</a></b>`;
  html += `<span id="userNames">${this.getUsers()}</span></div>`;
  return html;
}

Task.prototype.formatNotes = function() {
  return `<span class="blue-text">${this.notes}</span>`;
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
