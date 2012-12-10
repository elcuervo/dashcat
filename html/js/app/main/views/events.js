var EventsView = Backbone.Marionette.CollectionView.extend({
  id: "items",

  tagName: "ol",

  itemView: EventView,

  template: "#events-template",

  onRender: function() {
    this.infiniScroll = new Backbone.InfiniScroll(this.collection, {
      includePage: true,
      add: true
    });
  }
});
