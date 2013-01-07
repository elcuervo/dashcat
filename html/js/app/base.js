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
  withMacGap: function(fn) {
    if(typeof macgap != 'undefined') {
      fn.call();
    }
  },

  badge: function(size) {
    this.withMacGap(function() {
      macgap.dock.badge = "" + size;
    });
  },

  openBrowser: function(event) {
    this.withMacGap(function() {
      event.preventDefault();
      macgap.app.open(event.currentTarget.href);
    });
  },

  notify: function(message) {
    this.withMacGap(function() {
      macgap.growl.notify({
        title:   message.title,
        content: message.content
      });
    });
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
