let dropdownMenu = function() {
  $('.menu > .ui.dropdown').click(function() {
    $(this).dropdown();
  })
}

let joinButton = function() {
  $("#pairRequests").on("click", ".js-join", function() {
    var id = $(this).data("id");
    var url = `/pair_requests/${id}/create-team`;
    postJoinButton(url);
  })
}

let markInactiveButton = function() {
  $("#pairRequests").on("click", ".js-mark", function() {
    var id = $(this).data("id");
    var url = `/pair_requests/${id}`;
    patchInactiveButton(url, id);
  })
}

let submitPRForm = function() {
  $("#newPairRequest").submit(function(e) {
    e.preventDefault();
    var values = $(this).serialize();
    postPRForm(values);
    this.reset();
  });
}

let teamMenuItems = function() {
  $("#teamsMenu").on("click", ".js-team", function(e) {
    e.preventDefault();
    var id = $(this).data("id");
    loadTeamTasks(id);
  })
}
