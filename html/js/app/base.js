var DashCat = new Backbone.Marionette.Application({
  isAuthorized: function() {
    return !!this.token;
  },

  logout: function() {
    return localStorage.removeItem("oauth_token");
  }
});

DashCat.__defineGetter__("token", function() {
  return localStorage.getItem("oauth_token");
});

DashCat.__defineSetter__("token", function(token) {
  return localStorage.setItem("oauth_token", token);
});

DashCat.settings = function(configuration) {
  switch(true) {
    case typeof configuration == 'object':
      _.extend(DashCat.configuration, configuration)
      break;

    case typeof configuration == 'string':
      return DashCat.configuration[configuration];
      break;
  }

  localStorage.setItem("configuration", JSON.stringify(DashCat.configuration));
};

DashCat.system = {
  badge: function(size) {
    if(typeof macgap != 'undefined') {
      macgap.dock.badge = "" + size;
    }
  }
}

var settings = localStorage.getItem("settings");
DashCat.configuration = settings && JSON.parse(settings) || { notificate: true };

marked.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: true
});

DashCat.start();
