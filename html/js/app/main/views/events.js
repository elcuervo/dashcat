var EventsView = Backbone.Marionette.CollectionView.extend({
  id: "items",
  tagName: "ol",
  itemView: EventView,
  template: "#events-template",
});
