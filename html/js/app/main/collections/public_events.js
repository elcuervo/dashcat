var PublicEventsCollection = Backbone.Collection.extend({
  model: Event,
  url: "https://api.github.com/events"
});
