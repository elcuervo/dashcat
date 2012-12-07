var LoginView = Backbone.Marionette.ItemView.extend({
  template: "#login-template",

  events: {
    "submit form": "requestToken"
  },

  requestToken: function(e) {
    var username = this.$("#username").val();
    var password = this.$("#password").val();

    $.ajax({
      url: "https://api.github.com/authorizations",
      type: "POST",
      headers: {"Authorization": "Basic " + btoa(username + ":" + password)},
      data: JSON.stringify({ scopes: "repo" }),
      success: function(response) {
        DashCat.token = response.token;
        DashCat.Login.stop();
        DashCat.Main.start();
      }
    });
    return false;
  }
});
