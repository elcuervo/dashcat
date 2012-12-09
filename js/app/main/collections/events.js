var EventsCollection = Backbone.Collection.extend({
  model: Event,

  initialize: function(user) {
    this.url = "https://api.github.com/users/" + user + "/received_events";
  }
});
