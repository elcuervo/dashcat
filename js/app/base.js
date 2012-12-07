var gui = require("nw.gui")
var appWindow = gui.Window.get();

var DashCat = new Backbone.Marionette.Application({
  token: localStorage.getItem("oauth_token"),

  isAuthorized: function() {
    return !!this.token;
  },
});

DashCat.start();

appWindow.show();
appWindow.focus();

//var eventToIcon = {
//  "PushEvent": "push"
//};

//var getEvents = function(oauthToken) {
//  console.log(oauthToken);
//  $.ajax({
//    url: "https://api.github.com/users/elcuervo/received_events",
//    success: function(data) {
//      var ul = $("#items");
//      $.each(data, function(i, item) {
//        var message = item.actor.login + " " + item.type + " to " + item.repo.name;

//        ul.append(
//          $("<span>").addClass("icon " + eventToIcon[item.type])
//        );

//        ul.append( $("<li>").text(message));
//      })
//    }
//  });
//}

//if(!oauthToken) {
//  $.ajax({
//    url: "https://api.github.com/authorizations",
//    type: "POST",
//    headers: {"Authorization": "Basic " + btoa("elcuervo:*********")},
//    data: JSON.stringify({ scopes: "repo" }),
//    success: function(response) {
//      localStorage.setItem("oauth_token", response.token)
//      getEvents(response.token);
//    }
//  });
//} else {
//  getEvents(oauthToken);
//}
