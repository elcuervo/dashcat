var Main = DashCat.module("Main", {
  startWithParent: false,

  define: function(Main) {
    this.addInitializer(function() {
      Main.app = new Backbone.Marionette.Application();
      $("#container").show();

      Main.app.addRegions({
        menu: "#menu",
        content: "#content"
      });

      Main.app.addInitializer(function() {
        DashCat.user = new User();

        var menuView = new MenuView({ model: DashCat.user });

        this.loadingScreen = new LoadingScreen;
        this.showLoadingScreen = function() {
          this.content.show(this.loadingScreen);
        }

        this.showLoadingScreen();

        if(DashCat.token) {
          $(document).ajaxError(function(xhr) {
            if(xhr.status == 401) {
              menuView.exit();
            } else {
              console.error(arguments)
            }
          });

          $(document).ajaxStart(function() { $("#loader").show() });
          $(document).ajaxStop(function()  { $("#loader").hide() });

          $.ajaxSetup({
            headers: {
              "Authorization": "token " + DashCat.token,
              "Accept": "application/vnd.github.v3.full+json"
            }
          });
        }

        DashCat.user.fetch({
          success: function() {
            Main.app.notificationsCollection  = new NotificationsCollection();
            Main.app.eventsCollection         = new EventsCollection({
              user: DashCat.user.get("login")
            });
            Main.app.pullRequestsCollection   = new PullRequestsCollection();
            Main.app.publicEventsCollection   = new PublicEventsCollection();

            Main.app.notificationsView = new NotificationsView({
              collection: Main.app.notificationsCollection
            });

            Main.app.eventsView = new EventsView({
              collection: Main.app.eventsCollection
            });

            Main.app.pullRequestsView = new PullRequestsView({
              collection: Main.app.pullRequestsCollection
            });

            Main.app.publicEventsView = new EventsView({
              collection: Main.app.publicEventsCollection
            });


            Main.app.menu.show(menuView);
          }
        });

      });

      Main.app.start();
    });

    this.addFinalizer(function() {
      $("#container").hide();
      Main.app.menu.close();
      Main.app.content.close();
    });
  }
});
