var EventsView = Backbone.Marionette.CollectionView.extend({
  itemView: EventView,
  template: "#events-template",
  itemViewContainer: "ul"
});
