$(function() {
  var gui = require("nw.gui")
  var appWindow = gui.Window.get();

  appWindow.show();
  appWindow.focus();

  var DashCat = new Backbone.Marionette.Application();

  DashCat.addRegions({
    menu: "#menu",
    content: "#content"
  });

  DashCat.addInitializer(function() {
    var oauthToken = localStorage.getItem("oauth_token");

    if(oauthToken) {
      $.ajaxSetup({
        headers: { "Authorization": "token " + oauthToken },
      });
    }

    var user = new User();
    user.fetch();

    console.log(user);

    var menuView = new MenuView({
      model: user
    });

    var eventsCollection = new EventsCollection();
    var eventsView = new EventsView({
      collection: eventsCollection
    });

    eventsCollection.fetch();

    DashCat.menu.show(menuView);
    DashCat.content.show(eventsView);
  });

  DashCat.start();




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
});
