var MenuView = Backbone.Marionette.ItemView.extend({
  template: "#menu-template",

  events: {
    "click #privateEvents": "privateEvents",
    "click #publicEvents":  "publicEvents",
    "click #pullRequests":  "pullRequests",
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
        view.select("#privateEvents");
        DashCat.Main.app.content.show(eventsView);
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
        view.select("#pullRequests");
        DashCat.Main.app.content.show(pullRequestsView);
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
        view.select("#publicEvents");
        DashCat.Main.app.content.show(eventsView);
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
