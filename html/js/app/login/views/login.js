var LoginView = Backbone.Marionette.ItemView.extend({
  template: "#login-template",

  id: "login_menu",

  events: {
    "submit form": "getAuthorizations"
  },

  onRender: function() {
    $("#username").focus();
  },

  loadMainView: function(token) {
    DashCat.token = token;
    DashCat.Login.stop();
    DashCat.Main.start();
  },

  getAuthorizations: function(e) {
    var username = this.$("#username").val();
    var password = this.$("#password").val();
    var view = this;

    if(!username || !password) return this.badAuth();

    $.ajax({
      url: "https://api.github.com/authorizations",

      headers: { "Authorization": "Basic " + btoa(username + ":" + password) },

      success: function(response) {
        var auth = _.filter(response, function(authorization) {
          return authorization.app.name == "Dashcat";
        });

        if(_.isEmpty(auth)) {
          view.requestToken(username, password);
        } else {
          view.loadMainView(_.first(auth).token);
        }
      },

      error: function(xhr) {
        if(xhr.status == 401) {
          view.badAuth();
        } else {
          console.log(xhr)
        }
      }
    });

    return false;
  },

  badAuth: function() {
    this.$el.find(".fail-message").text("Bad username/password");
    return false;
  },

  requestToken: function(username, password) {
    var view = this;

    $.ajax({
      url: "https://api.github.com/authorizations",

      type: "POST",

      headers: {"Authorization": "Basic " + btoa(username + ":" + password)},

      data: JSON.stringify({
        scopes: "repo",
        client_id: DashCat.clientId,
        client_secret: DashCat.secret
      }),

      success: function(response) {
        view.loadMainView(response.token);
      }
    });

    return false;
  }
});
