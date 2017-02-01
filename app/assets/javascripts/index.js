/* global $ */

$(document).ready(function() {
  loadTeamsMenu();
  loadPairRequests();
  attachListeners();
})

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
      loadTeamTasks(team);
    })
  })
}

let loadTeamTasks = function(teamId) {
  $("#htmlGoesHere").load(`/teams/${teamId}/tasks #htmlGoesHere`);
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
