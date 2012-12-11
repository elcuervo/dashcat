var Login = DashCat.module("Login", {
  startWithParent: false,

  define: function() {
    var app = new Backbone.Marionette.Application();

    $(document).ajaxStart(function() { $("#octocat").addClass("big_glowing") });
    $(document).ajaxStop(function() { $("#octocat").removeClass("big_glowing") });

    $("#container").hide();

    this.addInitializer(function() {
      app.addRegions({
        main: "#login"
      });

      app.addInitializer(function() {
        var loginView = new LoginView();

        app.main.show(loginView);
      });

      app.start();
    });

    this.addFinalizer(function() {
      app.main.close();
    });
  }
});
