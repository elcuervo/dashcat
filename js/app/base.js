var gui = require("nw.gui")
var appWindow = gui.Window.get();

var DashCat = new Backbone.Marionette.Application({
  isAuthorized: function() {
    return !!this.token;
  },
});

DashCat.__defineGetter__("token", function() {
  return localStorage.getItem("oauth_token");
});

DashCat.__defineSetter__("token", function(token) {
  return localStorage.setItem("oauth_token", token);
});

DashCat.start();

appWindow.show();
appWindow.focus();
