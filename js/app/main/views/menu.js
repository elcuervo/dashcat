var MenuView = Backbone.Marionette.ItemView.extend({
  className: "avatar",
  template: "#menu-template",
  events: {
    "click #privateEvents": "privateEvents",
    "click #publicEvents": "publicEvents"
  },

  privateEvents: function() {
    var eventsCollection = new EventsCollection(DashCat.user.get("login"));
    var eventsView = new EventsView({
      collection: eventsCollection
    });

    eventsCollection.fetch({
      success: function() {
        DashCat.Main.app.content.show(eventsView);
      }
    });
  },

  publicEvents: function() {
    var publicEventsCollection = new PublicEventsCollection();
    var eventsView = new EventsView({
      collection: publicEventsCollection
    });

    publicEventsCollection.fetch({
      success: function() {
        DashCat.Main.app.content.show(eventsView);
      }
    });
  }
});
