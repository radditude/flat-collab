// ajax calls

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

let postPRForm = function(values) {
  var postRequest = $.post("/pair_requests", values);

  postRequest.done(function(data) {
    var thisPost = new PairRequest(data.pair_request);
    $("#pairRequests").prepend(thisPost.formatHTML());
  });
}

let postJoinButton = function(url) {
  var postRequest = $.post(url);

  postRequest.done(function(data) {
    var teamId = data.team.id;
    loadTeamTasks(teamId);
  })
}

let patchInactiveButton = function(url, id) {
  $.ajax({
    url: url,
    method: "PATCH"
  }).done(function() {
    $(`#pr-${id}`).hide(500);
  })
}
