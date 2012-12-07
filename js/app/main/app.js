var Main = DashCat.module("Main", {
  startWithParent: false,

  define: function() {
    this.addInitializer(function() {
      var App = new Backbone.Marionette.Application();

      App.addRegions({
        menu: "#menu",
        content: "#content"
      });

      App.addInitializer(function() {
        if(DashCat.token) {
          $.ajaxSetup({
            headers: { "Authorization": "token " + DashCat.token }
          });
        }

        var user = new User();
        var menuView = new MenuView({ model: user });

        var eventsCollection = new EventsCollection();
        var eventsView = new EventsView({
          collection: eventsCollection
        });

        eventsCollection.fetch({
          success: function() {
            App.content.show(eventsView);
          }
        });

        user.fetch({
          success: function() {
            App.menu.show(menuView);
          }
        });

      });

      App.start();
    });
  }
});
