var MenuView = Backbone.Marionette.ItemView.extend({
  template: "#menu-template",

  events: {
    "click #privateEvents": "privateEvents",
    "click #publicEvents":  "publicEvents",
    "click #pullRequests":  "pullRequests",
    "click #notifications": "notifications",
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

  pullRequests: function() {
    var pullRequestsCollection = new PullRequestsCollection();
    var view = this;
    var pullRequestsView = new PullRequestsView({
      collection: pullRequestsCollection
    });

    pullRequestsCollection.fetch({
      success: function() {
        DashCat.Main.app.content.show(pullRequestsView);
        view.select("#pullRequests");
      }
    });
  },

  notifications: function() {
    var notificationsCollection = new NotificationsCollection();
    var view = this;
    var notificationsView = new EventsView({
      collection: notificationsCollection
    });

    notificationsCollection.fetch({
      success: function() {
        DashCat.Main.app.content.show(notificationsView);
        view.select("#notifications");
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
