var MenuView = Backbone.Marionette.ItemView.extend({
  template: "#menu-template",

  events: {
    "click #privateEvents":       "privateEvents",
    "click #publicEvents":        "publicEvents",
    "click #notificationsEvents": "notificationsEvents",
    "click #pullRequests":        "pullRequests",
    "click #quit":                "exit"
  },

  initialize: function() {
    this.loadingScreen = new LoadingScreen;
  },

  notificationsEvents: function() {
    if(this.isSelected("#notificationsEvents")) {
      $(window).scrollTop(0);
      return;
    }

    this.select("#notificationsEvents");

    var notificationsCollection = new NotificationsCollection();

    var notificationsView = new NotificationsView({
      collection: notificationsCollection
    });

    if(notificationsCollection.isEmpty()) {
      DashCat.Main.app.content.show(this.loadingScreen);
    }

    notificationsCollection.fetcher.done(function() {
      DashCat.Main.app.content.show(notificationsView);
    });
  },

  privateEvents: function() {
    if(this.isSelected("#privateEvents")) {
      $(window).scrollTop(0);
      return;
    }

    this.select("#privateEvents");

    var eventsCollection = new EventsCollection({
      user: DashCat.user.get("login")
    });

    var eventsView = new EventsView({
      collection: eventsCollection
    });

    if(eventsCollection.isEmpty()) {
      DashCat.Main.app.content.show(this.loadingScreen);
    }

    eventsCollection.fetcher.done(function() {
      DashCat.Main.app.content.show(eventsView);
    });
  },

  pullRequests: function() {
    if(this.isSelected("#pullRequests")) {
      $(window).scrollTop(0);
      return;
    }

    this.select("#pullRequests");

    var pullRequestsCollection = new PullRequestsCollection();
    var pullRequestsView = new PullRequestsView({
      collection: pullRequestsCollection
    });

    if(pullRequestsCollection.isEmpty()) {
      DashCat.Main.app.content.show(this.loadingScreen);
    }

    pullRequestsCollection.loading.done(function() {
      DashCat.Main.app.content.show(pullRequestsView);
    });
  },

  publicEvents: function() {
    if(this.isSelected("#publicEvents")) {
      $(window).scrollTop(0);
      return;
    }

    this.select("#publicEvents");

    var publicEventsCollection = new PublicEventsCollection();
    var eventsView = new EventsView({
      collection: publicEventsCollection
    });

    if(publicEventsCollection.isEmpty()) {
      DashCat.Main.app.content.show(this.loadingScreen);
    }

    publicEventsCollection.fetcher.done(function() {
      DashCat.Main.app.content.show(eventsView);
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
