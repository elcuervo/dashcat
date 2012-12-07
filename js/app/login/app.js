var Login = DashCat.module("Login", {
  startWithParent: false,

  define: function() {
    this.addInitializer(function() {
      var App = new Backbone.Marionette.Application();

      App.addRegions({
        main: "#login"
      });

      App.addInitializer(function() {
        var loginView = new LoginView();

        App.main.show(loginView);
      });

      App.start();
    });
  }
});
