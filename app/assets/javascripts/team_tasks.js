let loadTeamTasks = function(teamId) {
  var url = `/teams/${teamId}/tasks`
  $("#htmlGoesHere").load(url + " #htmlGoesHere");
  loadTaskList(url);
}

let loadTaskList = function(url) {
  $.get(url + "/load", function(response) {
    console.log(response);
  })
}
