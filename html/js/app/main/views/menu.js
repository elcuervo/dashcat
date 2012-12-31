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
    this.app = DashCat.Main.app;
  },

  notificationsEvents: function() {
    if(this.isSelected("#notificationsEvents")) {
      $(window).scrollTop(0);
      return;
    }

    this.select("#notificationsEvents");

    if(this.app.notificationsCollection.isEmpty()) {
      this.app.showLoadingScreen()
    }

    this.app.notificationsCollection.loading.done(_.bind(function() {
      this.app.content.show(this.app.notificationsView);
      this.app.previousView = this.app.notificationsView;
    }, this));
  },

  privateEvents: function() {
    if(this.isSelected("#privateEvents")) {
      $(window).scrollTop(0);
      return;
    }

    this.select("#privateEvents");

    console.log(this.app);
    if(this.app.eventsCollection.isEmpty()) {
      this.app.showLoadingScreen()
    }

    this.app.eventsCollection.fetcher.done(_.bind(function() {
      this.app.content.show(this.app.eventsView);
      this.app.previousView = this.app.eventsView;
    }, this));
  },

  pullRequests: function() {
    if(this.isSelected("#pullRequests")) {
      $(window).scrollTop(0);
      return;
    }

    this.select("#pullRequests");

    console.log(this);

    if(this.app.pullRequestsCollection.isEmpty()) {
      this.app.showLoadingScreen()
    }

    this.app.pullRequestsCollection.loading.done(_.bind(function() {
      this.app.content.show(this.app.pullRequestsView);
      this.app.previousView = this.app.pullRequestsView;
    }, this));
  },

  publicEvents: function() {
    if(this.isSelected("#publicEvents")) {
      $(window).scrollTop(0);
      return;
    }

    this.select("#publicEvents");

    if(this.app.publicEventsCollection.isEmpty()) {
      this.app.showLoadingScreen()
    }

    this.app.publicEventsCollection.fetcher.done(_.bind(function() {
      this.app.content.show(this.app.publicEventsView);
      this.app.previousView = this.app.publicEventsView;
    }, this));
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
