var MenuView = Backbone.Marionette.ItemView.extend({
  template: "#menu-template",

  events: {
    "click #privateEvents":       "privateEvents",
    "click #publicEvents":        "publicEvents",
    "click #notificationsEvents": "notificationsEvents",
    "click #pullRequests":        "pullRequests",
    "click #quit":                "exit"
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
      DashCat.Main.app.showLoadingScreen()
    }

    notificationsCollection.loading.done(function() {
      DashCat.Main.app.content.show(notificationsView);
      DashCat.Main.app.notificationsView = notificationsView;
      DashCat.Main.app.previousView = notificationsView;
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
      DashCat.Main.app.showLoadingScreen()
    }

    eventsCollection.fetcher.done(function() {
      DashCat.Main.app.content.show(eventsView);
      DashCat.Main.app.eventsView = eventsView;
      DashCat.Main.app.previousView = eventsView;
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
      DashCat.Main.app.showLoadingScreen()
    }

    pullRequestsCollection.loading.done(function() {
      DashCat.Main.app.content.show(pullRequestsView);
      DashCat.Main.app.pullRequestsView = pullRequestsView;
      DashCat.Main.app.previousView = pullRequestsView;
    });
  },

  publicEvents: function() {
    if(this.isSelected("#publicEvents")) {
      $(window).scrollTop(0);
      return;
    }

    this.select("#publicEvents");

    var publicEventsCollection = new PublicEventsCollection();
    var publicEventsView = new EventsView({
      collection: publicEventsCollection
    });

    if(publicEventsCollection.isEmpty()) {
      DashCat.Main.app.showLoadingScreen()
    }

    publicEventsCollection.fetcher.done(function() {
      DashCat.Main.app.content.show(publicEventsView);
      DashCat.Main.app.publicEventsView = publicEventsView;
      DashCat.Main.app.previousView = publicEventsView;
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
