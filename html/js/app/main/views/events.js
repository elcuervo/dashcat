var EventsView = Backbone.Marionette.CollectionView.extend({
  id: "items",

  tagName: "ol",

  itemView: EventView,

  template: "#events-template",

  initialize: function() {
    setInterval(function(collection) {
      collection.fetch({
        add: true,
        metadata: {
          prepend: true,
        }
      });
    }, 5000, this.collection);
  },

  appendHtml: function(collectionView, itemView, index){
    var model = itemView.model;
    var container = collectionView.$el;

    if(model.metadata && model.metadata.prepend) {
      container.prepend(itemView.el);
    } else {
      container.append(itemView.el);
    }
  },

  onRender: function() {
    new Backbone.InfiniScroll(this.collection, {
      includePage: true,
      add: true
    });
  }
});
