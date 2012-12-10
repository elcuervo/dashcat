var EventsCollection = BasicEventsCollection.extend({
  initialize: function(user) {
    this.url = "https://api.github.com/users/" + user + "/received_events";
  }
});
