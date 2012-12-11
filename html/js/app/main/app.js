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
        if(DashCat.token) {
          $(document).ajaxError(function() {
            menuView.exit();
          });

          $(document).ajaxStart(function() { $("#octocat").addClass("glowing") });
          $(document).ajaxStop(function() { $("#octocat").removeClass("glowing") });

          $.ajaxSetup({
            headers: { "Authorization": "token " + DashCat.token }
          });
        }

        DashCat.user = new User();
        var menuView = new MenuView({ model: DashCat.user });

        DashCat.user.fetch({
          success: function() {
            menuView.privateEvents();
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
