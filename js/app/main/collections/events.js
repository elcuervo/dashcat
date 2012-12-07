var EventsCollection = Backbone.Collection.extend({
  model: Event,
  //url: "https://api.github.com/users/elcuervo/received_events"
  url: "https://api.github.com/events"
});
