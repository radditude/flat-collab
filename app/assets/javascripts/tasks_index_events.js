let attachEditTaskListener = function() {
  $("form").on("submit", function(e) {
    e.preventDefault();
    var values = $("form").serialize();
    patchEditForm(values);
  })
}

let attachBackLinkListener = function() {
  $("#backToTasksIndex").on("click", function(e) {
    e.preventDefault();
    loadTeamTasks(currentTeam);
  });
}

let submitTaskForm = function() {
  $("#submitTaskForm").click(function(e) {
    e.preventDefault();
    var values = $("form#newTaskForm").serialize();
    postNewTask(values);
  });
}

let submitCommentForm = function() {
  $("#tasksGoHere").on("click", ".commentButton", function(e) {
    e.preventDefault();
    var id = $(this).data("id");
    var values = $(`#task${id}-comment-form`).serialize();
    postNewComment(values, id);
  });
}

let myTasksButton = function() {
  $("#myTasks").click(function(e) {
    e.preventDefault();
    getMyTasksButton();
  })
}

let incompleteTasksButton = function() {
  $("#incompleteTasks").click(function(e) {
    e.preventDefault();
    getIncompleteTasksButton();
  })
}

let allTasksButton = function() {
  $("#allTasks").click(function(e) {
    e.preventDefault();
    getAllTasksButton();
  })
}

let deleteTaskButtons = function() {
  $("#tasksGoHere").on("click", ".delete", function() {
    var id = $(this).data("id");
    var url = `/teams/${currentTeam}/tasks/${id}`;
    deleteTaskRequest(url, id);
  });
}

let claimTaskButtons = function() {
  $("#tasksGoHere").on("click", ".claim", function() {
    var id = $(this).data("id");
    var url = `/teams/${currentTeam}/tasks/${id}/claim`;
    patchClaimTask(url, id);
  })
}

let completeTaskButtons = function() {
  $("#tasksGoHere").on("click", ".complete", function() {
    var id = $(this).data("id");
    var url = `/teams/${currentTeam}/tasks/${id}/complete`;
    patchCompleteTask(url, id);
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
