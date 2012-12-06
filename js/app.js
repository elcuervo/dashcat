var gui = require("nw.gui")
gui.Window.get().show();

$(function() {
  var oauthToken = localStorage.getItem("oauth_token");
  if(!oauthToken) {
    $.ajax({
      url: "https://api.github.com/authorizations",
      type: "POST",
      headers: {"Authorization": "Basic " + btoa("elcuervo:*********")},
      data: JSON.stringify({ scopes: "notifications" }),
      success: function(data) {
        response = JSON.parse(data);
        localStorage.setItem("oauth_token", response.token)
      }
    });
  }
  $.ajax({
    url: "https://api.github.com/events",
    headers: {"Authorization": "token " + oauthToken},
    success: function(data) {
      console.log(data);
    }
  });
});
