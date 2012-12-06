var gui = require("nw.gui")
gui.Window.get().show();

$(function() {
  var oauthToken = localStorage.getItem("oauth_token");

  var getEvents = function(oauthToken) {
    console.log(oauthToken);
    $.ajax({
      url: "https://api.github.com/users/elcuervo/received_events",
      headers: {"Authorization": "token " + oauthToken},
      success: function(data) {
        var ul = $("#items");
        $.each(data, function(i, item) {
          var message = item.type + " from " + item.actor.login;

          ul.append($("<li>").text(message));
        })
      }
    });
  }

  if(!oauthToken) {
    $.ajax({
      url: "https://api.github.com/authorizations",
      type: "POST",
      headers: {"Authorization": "Basic " + btoa("elcuervo:*********")},
      data: JSON.stringify({ scopes: "repo" }),
      success: function(response) {
        localStorage.setItem("oauth_token", response.token)
        getEvents(response.token);
      }
    });
  } else {
    getEvents(oauthToken);
  }
});
