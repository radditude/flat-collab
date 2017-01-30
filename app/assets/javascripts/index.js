$(document).ready(function() {
  loadPairRequests();
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

  joinButton() {
    return `<button class="small ui blue button" data-id="${this.id}">Join Team!</button>`
  }

  formatHTML() {
    return `<div class="item"><br><div class="content">${this.formatTitle()} ${this.formatInfo()} ${this.postedAt()} ${this.joinButton()}</div><br></div>`;
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
