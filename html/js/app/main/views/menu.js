var MenuView = Backbone.Marionette.ItemView.extend({
  template: "#menu-template",

  events: {
    "click #privateEvents": "privateEvents",
    "click #publicEvents":  "publicEvents",
    "click #pullRequests":  "pullRequests",
    "click #quit": "exit"
  },

  privateEvents: function() {
    if(this.isSelected("#privateEvents")) return;

    this.select("#privateEvents");

    var eventsCollection = new EventsCollection(DashCat.user.get("login"));
    var view = this;
    var eventsView = new EventsView({
      collection: eventsCollection
    });

    eventsCollection.fetch({
      success: function() {
        DashCat.Main.app.content.show(eventsView);
      }
    });
  },

  pullRequests: function() {
    if(this.isSelected("#pullRequests")) return;

    this.select("#pullRequests");

    var pullRequestsCollection = new PullRequestsCollection();
    var pullRequestsView = new PullRequestsView({
      collection: pullRequestsCollection
    });

    pullRequestsCollection.fetch({
      success: function() {
        DashCat.Main.app.content.show(pullRequestsView);
      }
    });
  },

  publicEvents: function() {
    if(this.isSelected("#publicEvents")) return;

    this.select("#publicEvents");

    var publicEventsCollection = new PublicEventsCollection();
    var eventsView = new EventsView({
      collection: publicEventsCollection
    });

    publicEventsCollection.fetch({
      success: function() {
        DashCat.Main.app.content.show(eventsView);
      }
    });
  },

  onRender: function() {
    this.privateEvents();
  },

  isSelected: function(id) {
    return this.$(id).find(".menu-icon.selected").length > 0;
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
