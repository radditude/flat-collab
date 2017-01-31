/* global $ */

$(document).ready(function() {
  loadPairRequests();
  attachListeners();
})

class PairRequest {
  constructor(data) {
    Object.assign(this, data)
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
      return `<button class="js-inactive small ui red button" data-id="${this.id}">Mark Inactive</button>`;
    } else {
      return `<button class="js-join small ui blue button" data-id="${this.id}">Join Team!</button>`;
    }
  }

  formatHTML() {
    return `<div class="item" id="pr-${this.id}"><br><div class="content">${this.formatTitle()} ${this.formatInfo()} ${this.postedAt()} ${this.loadButton()}</div><br></div>`;
  }
}

let loadPairRequests = function() {
  $.get("/pair_requests", function(data){
    var posts = data.pair_requests;
    $(posts).each(function(index, post) {
      var thisPost = new PairRequest(post);
      $("#pairRequests").prepend(thisPost.formatHTML());
    });
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
      var team = data.team;
      $("#htmlGoesHere").load(`/teams/${team.id}/tasks #htmlGoesHere`)
    })
  })
}


let attachListeners = function() {
  submitPRForm();
  joinButton();
}
