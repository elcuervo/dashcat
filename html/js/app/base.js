var DashCat = new Backbone.Marionette.Application({
  isAuthorized: function() {
    return !!this.token;
  },

  logout: function() {
    return localStorage.removeItem("oauth_token");
  }
});

DashCat.clientId = "*********";
DashCat.secret   = "********************";

DashCat.__defineGetter__("token", function() {
  return localStorage.getItem("oauth_token");
});

DashCat.__defineSetter__("token", function(token) {
  return localStorage.setItem("oauth_token", token);
});

marked.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: true
});

DashCat.start();
