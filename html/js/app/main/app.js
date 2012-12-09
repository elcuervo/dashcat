var Main = DashCat.module("Main", {
  startWithParent: false,

  define: function(Main) {
    this.addInitializer(function() {
      Main.app = new Backbone.Marionette.Application();

      Main.app.addRegions({
        menu: "#menu",
        content: "#content"
      });

      Main.app.addInitializer(function() {
        if(DashCat.token) {
          $.ajaxSetup({
            headers: { "Authorization": "token " + DashCat.token }
          });
        }

        DashCat.user = new User();
        var menuView = new MenuView({ model: DashCat.user });

        DashCat.user.fetch({
          success: function() {
            var eventsCollection = new EventsCollection(
              DashCat.user.get("login")
            );

            var eventsView = new EventsView({
              collection: eventsCollection
            });

            eventsCollection.fetch({
              success: function() {
                Main.app.content.show(eventsView);
              }
            });

            Main.app.menu.show(menuView);
          }
        });

      });

      Main.app.start();
    });

    this.addFinalizer(function() {
      Main.app.menu.close();
      Main.app.content.close();
    });
  }
});
