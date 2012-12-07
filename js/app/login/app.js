var Login = DashCat.module("Login", {
  startWithParent: false,

  define: function() {
    var app = new Backbone.Marionette.Application();

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
