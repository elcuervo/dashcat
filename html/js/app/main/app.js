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
            headers: { "Authorization": "token " + DashCat.token }
          });
        }

        DashCat.user.fetch({
          success: function() {
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
