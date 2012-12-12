var HeadTailAutoRefresh = Backbone.Marionette.CollectionView.extend({
  tagName: "ol",

  initialize: function() {
    setInterval(_.bind(this.refreshAndAppendCollection, this), 5000);
  },

  refreshAndAppendCollection: function(fn) {
    var fn = fn || function() {};

    this.collection.fetch({
      add: true,
      success: fn,
      metadata: { prepend: true, }
    });
  },

  appendHtml: function(collectionView, itemView, index){
    var model = itemView.model;
    var container = collectionView.$el;

    if(model.metadata && model.metadata.prepend) {
      container.prepend(itemView.el);

      //var title = itemView.$el.find("h2").text();
      //var content = itemView.$el.find(".info").text();
    } else {
      container.append(itemView.el);
    }
  },

  onShow: function() {
    var view = this;

    new iScroll("content", {
      useTransition: true,

      onScrollMove: function() {
        if(this.y > 20) {
          $("#pull").fadeIn();

          if(this.y > 50) this.refresh = true;
        } else {
          $("#pull").fadeOut();
        }

      },

      refresh: function() {},

      onScrollEnd: function() {
        if(this.refresh) {
          view.refreshAndAppendCollection(function() {
            $("#placeholder").fadeOut(function() {
              $("#placeholder").remove();
            });

          });
          view.refreshPlaceholder();
          this.refresh = false;
        }

        $("#pull").fadeOut();
      }
    });

    document.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, false);
  },

  refreshPlaceholder: function() {
    this.$el.prepend($("#loader-template").html());
  },

  onRender: function() {
    new Backbone.InfiniScroll(this.collection, {
      includePage: true,
      add: true
    });
  }
});
