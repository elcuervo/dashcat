var MenuView = BaseItemView.extend({
  template: "#menu-template",

  events: {
    "click #privateEvents":       "privateEvents",
    "click #publicEvents":        "publicEvents",
    "click #notificationsEvents": "notificationsEvents",
    "click #pullRequests":        "pullRequests",
    "click #settings":            "settings",
    "click #quit":                "exit"
  },

  initialize: function() {
    this.app = DashCat.Main.app;
  },

  notificationsEvents: function() {
    this.activate(
      "#notificationsEvents",
      this.app.notificationsCollection,
      this.app.notificationsCollection.loading,
      this.app.notificationsView
    );
  },

  privateEvents: function() {
    this.activate(
      "#privateEvents",
      this.app.eventsCollection,
      this.app.eventsCollection.fetcher,
      this.app.eventsView
    );
  },

  pullRequests: function() {
    this.activate(
      "#pullRequests",
      this.app.pullRequestsCollection,
      this.app.pullRequestsCollection.loading,
      this.app.pullRequestsView
    );

    this.app.pullRequestsCollection.on("add", function(model, collection) {
    })
  },

  publicEvents: function() {
    this.activate(
      "#publicEvents",
      this.app.publicEventsCollection,
      this.app.publicEventsCollection.fetcher,
      this.app.publicEventsView
    );
  },

  settings: function() {
    var id = "#settings";

    if(this.isSelected(id)) {
      $(window).scrollTop(0);
      return;
    }

    this.select(id);

    this.app.content.show(Main.app.settingsView);
  },

  onRender: function() {
    this.privateEvents();
  },

  activate: function(id, collection, promise, view) {
    if(this.isSelected(id)) {
      $(window).scrollTop(0);
      return;
    }

    this.select(id);

    if(collection.isEmpty()) {
      this.app.showLoadingScreen()
    }

    promise.done(_.bind(function() {
      this.makeVisible(view);
    }, this));
  },

  makeVisible: function(view) {
    this.app.content.show(view);
    this.app.previousView = view;
    // TODO: There is a bug somewhere, this is not suppose to be needed
    view.collection.on("all", function() {
      view.render();
    })
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
