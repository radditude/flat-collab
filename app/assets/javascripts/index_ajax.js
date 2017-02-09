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
