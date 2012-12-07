var EventsView = Backbone.Marionette.CollectionView.extend({
  id: "items",
  tagName: "ul",
  itemView: EventView,
  template: "#events-template",
});
