var MenuView = Backbone.Marionette.ItemView.extend({
  className: "avatar",

  template: "#menu-template",

  events: {
    "click #privateEvents": "privateEvents",
    "click #publicEvents":  "publicEvents",
    "click #quit": "exit"
  },

  privateEvents: function() {
    var eventsCollection = new EventsCollection(DashCat.user.get("login"));
    var view = this;
    var eventsView = new EventsView({
      collection: eventsCollection
    });

    eventsCollection.fetch({
      success: function() {
        DashCat.Main.app.content.show(eventsView);
        view.select("#privateEvents");
      }
    });
  },

  publicEvents: function() {
    var publicEventsCollection = new PublicEventsCollection();
    var view = this;
    var eventsView = new EventsView({
      collection: publicEventsCollection
    });


    publicEventsCollection.fetch({
      success: function() {
        DashCat.Main.app.content.show(eventsView);
        view.select("#publicEvents");
      }
    });
  },

  select: function(id) {
    this.$(".menu-icon").removeClass("selected");
    this.$(id).find(".menu-icon").addClass("selected");
  },

  exit: function() {
    DashCat.Main.stop();
    DashCat.logout();
    DashCat.Login.start();
  }
});
