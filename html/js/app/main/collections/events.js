var EventsCollection = DashCatEventsCollection.extend({
  afterInitialize: function() {
    this.url = "https://api.github.com/users/" + this.options.user + "/received_events";
  }
});
