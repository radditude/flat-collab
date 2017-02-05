!function(){var t=function(t){var e={exports:{}};return t.call(e.exports,e,e.exports),e.exports},e=(window,function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}()),n=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};t(function(){"use strict";function t(t){Object.assign(this,t)}$(document).ready(function(){u(),r(),p()});var i,o,s=function(){function t(e){n(this,t),Object.assign(this,e)}return e(t,[{key:"postedAt",value:function(){var t=new Date(this.updated_at),e=t.getDate(),n=t.getMonth();return'<p class="small italic">Posted '+(n+1)+"/"+e+"</p>"}},{key:"formatTitle",value:function(){return'<div class="header">'+this.user.name+" is looking for a parter for "+this.project+"</div><br>"}},{key:"formatInfo",value:function(){return""+this.info}},{key:"loadButton",value:function(){return currentUser.id===this.user.id?'<button class="js-mark small ui red button" data-id="'+this.id+'">Mark Inactive</button>':'<button class="js-join small ui blue button" data-id="'+this.id+'">Join Team!</button>'}},{key:"formatHTML",value:function(){return'<div class="item" id="pr-'+this.id+'"><br><div class="content">'+this.formatTitle()+" "+this.formatInfo()+" "+this.postedAt()+" "+this.loadButton()+"</div><br></div>"}}]),t}(),a=function(){function t(e){n(this,t),Object.assign(this,e)}return e(t,[{key:"formatHTML",value:function(){return'<a class="item js-team" href="#" data-id="'+this.id+'">'+this.name+"</a>"}}]),t}(),r=function(){$.get("/pair_requests",function(t){var e=t.pair_requests;$(e).each(function(t,e){var n=new s(e);$("#pairRequests").prepend(n.formatHTML())})})},u=function(){$.get("/teams",function(t){var e=t.teams;$(e).each(function(t,e){var n=new a(e);$("#teamsMenu").append(n.formatHTML())})})},c=function(){$("#newPairRequest").submit(function(t){t.preventDefault();var e=$(this).serialize(),n=$.post("/pair_requests",e);n.done(function(t){var e=new s(t.pair_request);$("#pairRequests").prepend(e.formatHTML())}),this.reset()})},m=function(){$("#pairRequests").on("click",".js-join",function(){var t=$(this).data("id"),e="/pair_requests/"+t+"/create-team",n=$.post(e);n.done(function(t){var e=t.team.id;h(e)})})},d=function(){$("#teamsMenu").on("click",".js-team",function(t){t.preventDefault();var e=$(this).data("id");h(e)})},f=function(){$("#pairRequests").on("click",".js-mark",function(){var t=$(this).data("id"),e="/pair_requests/"+t;$.ajax({url:e,method:"PATCH"}).done(function(){$("#pr-"+t).hide(500)})})},l=function(){$(".menu > .ui.dropdown").click(function(){$(this).dropdown()})},p=function(){c(),m(),f(),l(),d()},h=function(t){var e="/teams/"+t+"/tasks";$("#text-container").load(e+" #htmlGoesHere",function(){i=t,y(e),v()})},k=function(t){var e="/teams/"+i+"/tasks/"+t+"/edit";$("#text-container").load(e+" #htmlGoesHere",function(){o=t,b()})},v=function(){G(),C(),L(),x(),w(),g(),j(),M(),B()},b=function(){$("form").on("submit",function(t){t.preventDefault();var e=$("form").serialize();$.ajax({url:"/teams/"+i+"/tasks/"+o,method:"PATCH",data:e}).done(function(){h(i)})})},y=function(e){$.get(e+"/load",function(e){$(e.tasks).each(function(e,n){var i=new t(n),o=i.formatHTML();$("#tasksGoHere").prepend(o)})})};t.prototype.getUsers=function(){return 2===this.users.length?" &mdash; "+this.users[0].name+" & "+this.users[1].name:1===this.users.length?" &mdash; "+this.users[0].name:""},t.prototype.belongsToUser=function(){for(var t=this.users.length,e=0;e<t;e++)if(this.users[e].id===currentUser.id)return!0;return!1},t.prototype.chooseButtonType=function(){return this.belongsToUser()&&"complete"!==this.status?this.completeButton():"complete"===this.status?this.completedTask():this.users.length>0?"":this.claimButton()},t.prototype.completeButton=function(){return'<button class="mini ui complete blue button" data-id="'+this.id+'">Mark Complete</button>'},t.prototype.completedTask=function(){return'<button class="mini ui completed green button" data-id="'+this.id+'">Completed!</button>'},t.prototype.claimButton=function(){return'<button class="mini ui claim yellow button" data-id="'+this.id+'">Claim Task</button>'},t.prototype.editButton=function(){return'<button class="mini ui editTask white icon button" data-id="'+this.id+'"><i class="edit icon"></i></button>'},t.prototype.deleteButton=function(){return'<button class="mini ui delete red icon button" data-id="'+this.id+'"><i class="remove icon"></i></button>'},t.prototype.formatButtons=function(){return'<div class="floating">'+this.chooseButtonType()+this.editButton()+this.deleteButton()+"</div>"},t.prototype.formatName=function(){return'<div class="caps small-header"><b>'+this.name+"</b>"+this.getUsers()+"</div>"},t.prototype.formatNotes=function(){return'<span class="blue-text">'+this.notes+"</span>"},t.prototype.formatCommentsList=function(){var t="<div class='ui bulleted list'>",e=this.id;return $(this.comments).each(function(e,n){t+=T(n.content)}),t+="</div>",t+=H(e)},t.prototype.formatHTML=function(){var t='<div class="ui divider"></div>';return t+='<div class="item" id="task'+this.id+'"><br><div class="content">',t+=""+this.formatButtons()+this.formatName()+this.formatNotes()+this.formatCommentsList(),t+="</div><br></div>"};var T=function(t){return'<div class="item">'+t+"</div>"},H=function(t){var e=$("meta[name=csrf-token]").attr("content"),n="<form class='ui inline comment form' id=\"task"+t+'-comment-form">';return n+="<input type='hidden' name='authenticity_token' value='"+e+"'>",n+="<div class='field'>",n+='<input type="text" name="comment[content]"></div>',n+='<button type="submit" class="mini ui button commentButton" data-id="'+t+'">Add Comment</button>',n+="</form>"},g=function(){$("#submitTaskForm").click(function(e){e.preventDefault();var n=$("form#newTaskForm").serialize(),o=$.post("/teams/"+i+"/tasks",n);o.done(function(e){var n=new t(e.task);$("#tasksGoHere").prepend(n.formatHTML()),$("form#newTaskForm")[0].reset()})})},w=function(){$("#tasksGoHere").on("click",".commentButton",function(t){t.preventDefault();var e=$(this).data("id"),n=$("#task"+e+"-comment-form").serialize(),o=$.post("/teams/"+i+"/tasks/"+e+"/comments",n);o.done(function(t){var n=T(t.comment.content);$("#task"+e+" .ui.bulleted.list").append(n),$("#task"+e+"-comment-form")[0].reset()})})},j=function(){$("#myTasks").click(function(e){e.preventDefault(),$.get("/teams/"+i+"/tasks/user_tasks",function(e){$("#tasksGoHere").empty(),$(e.tasks).each(function(e,n){var i=new t(n);$("#tasksGoHere").prepend(i.formatHTML())})})})},M=function(){$("#incompleteTasks").click(function(e){e.preventDefault(),$.get("/teams/"+i+"/tasks/incomplete",function(e){$("#tasksGoHere").empty(),$(e.tasks).each(function(e,n){var i=new t(n);$("#tasksGoHere").prepend(i.formatHTML())})})})},B=function(){$("#allTasks").click(function(e){e.preventDefault(),$.get("/teams/"+i+"/tasks/load",function(e){$("#tasksGoHere").empty(),$(e.tasks).each(function(e,n){var i=new t(n);$("#tasksGoHere").prepend(i.formatHTML())})})})},G=function(){$("#tasksGoHere").on("click",".delete",function(){var t=$(this).data("id"),e="/teams/"+i+"/tasks/"+t;$.ajax({url:e,method:"DELETE"}).done(function(){$("#task"+t).hide(500)})})},L=function(){$("#tasksGoHere").on("click",".claim",function(){var t=$(this).data("id"),e="/teams/"+i+"/tasks/"+t+"/claim";$.ajax({url:e,method:"PATCH"}).done(function(){$("#task"+t+" button.claim").replaceWith('<button class="mini ui complete blue button" data-id="'+t+'">Mark Complete</button>')})})},x=function(){$("#tasksGoHere").on("click",".complete",function(){var t=$(this).data("id"),e="/teams/"+i+"/tasks/"+t+"/complete";$.ajax({url:e,method:"PATCH"}).done(function(){$("#task"+t+" button.complete").replaceWith('<button class="mini ui completed green button" data-id="'+t+'">Completed!</button>')})})},C=function(){$("#tasksGoHere").on("click",".editTask",function(){var t=$(this).data("id");k(t)})}})}();