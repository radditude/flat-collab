let deleteTaskRequest = function(url, id) {
  $.ajax({
    url: url,
    method: "DELETE"
  }).done(function() {
    $(`#task${id}`).hide(500);
  });
}

let getAllTasksButton = function() {
  $.get(`/teams/${currentTeam}/tasks/load`, function(data) {
    $("#tasksGoHere").empty();
    $(data.tasks).each(function(index, task) {
      var thisTask = new Task(task);
      $("#tasksGoHere").prepend(thisTask.formatHTML());
    })
  })
}

let getIncompleteTasksButton = function() {
  $.get(`/teams/${currentTeam}/tasks/incomplete`, function(data) {
    $("#tasksGoHere").empty();
    $(data.tasks).each(function(index, task) {
      var thisTask = new Task(task);
      $("#tasksGoHere").prepend(thisTask.formatHTML());
    })
  })
}

let getMyTasksButton = function() {
  $.get(`/teams/${currentTeam}/tasks/user_tasks`, function(data) {
    $("#tasksGoHere").empty();
    $(data.tasks).each(function(index, task) {
      var thisTask = new Task(task);
      $("#tasksGoHere").prepend(thisTask.formatHTML());
    })
  })
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

let loadTaskList = function(url) {
  $.get(url + "/load", function(response) {
    $(response.tasks).each(function(index, task) {
      var thisTask = new Task(task);
      var html = thisTask.formatHTML();
      $("#tasksGoHere").prepend(html);
    });
  });
}

let loadTeamTasks = function(teamId) {
  var url = `/teams/${teamId}/tasks`;
  $("#text-container").load(url + " #htmlGoesHere", function() {
    currentTeam = teamId;
    loadTaskList(url);
    attachTeamTasksListeners();
  });
}

let patchClaimTask = function(url, id) {
  $.ajax({
    url: url,
    method: "PATCH"
  }).done(function(response) {
    var theTask = new Task(response.task);
    $(`#task${id} button.claim`).replaceWith(theTask.completeButton());
    $(`#task${id} #userNames`).html(theTask.getUsers());
  });
}

let patchCompleteTask = function(url, id) {
  $.ajax({
    url: url,
    method: "PATCH"
  }).done(function() {
    $(`#task${id} button.complete`).replaceWith(`<button class="mini ui completed green button" data-id="${id}">Completed!</button>`);
  });
}

let patchEditForm = function(values) {
  $.ajax({
    url: `/teams/${currentTeam}/tasks/${currentTask}`,
    method: "PATCH",
    data: values
  }).done(function() {
    loadTeamTasks(currentTeam);
  });
}

let postNewComment = function(values, taskId) {
  var postRequest = $.post(`/teams/${currentTeam}/tasks/${taskId}/comments`, values);
  postRequest.done(function(data) {
    var html = formatComment(data.comment.content);
    $(`#task${taskId} .ui.bulleted.list`).append(html);
    $(`#task${taskId}-comment-form`)[0].reset();
  });
}

let postNewTask = function(values) {
  var postRequest = $.post(`/teams/${currentTeam}/tasks`, values);
  postRequest.done(function(data) {
    var thisTask = new Task(data.task);
    $("#tasksGoHere").prepend(thisTask.formatHTML());
    $("form#newTaskForm")[0].reset();
  });
}
