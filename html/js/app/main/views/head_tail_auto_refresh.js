var HeadTailAutoRefresh = Backbone.Marionette.CollectionView.extend({
  tagName: "ol",

  emptyView: NothingToSeeView,

  initialize: function() {
    setInterval(_.bind(this.refreshAndAppendCollection, this), 5000);
  },

  updateTime: function() {
    var elements = this.$el.find("[data-time]");

    _.each(elements, function(element) {
      var item = $(element);
      var time = item.data("time");

      item.html(moment(time).fromNow());
    });
  },

  refreshAndAppendCollection: function(fn) {
    var fn = fn || function() {};
    var view = this;

    this.collection.fetch({
      add: true,
      success: function() {
        view.updateTime();
        fn.call(this);
      },
      metadata: { prepend: true, }
    });
  },

  appendHtml: function(collectionView, itemView, index){
    var model = itemView.model;
    var container = collectionView.$el;

    if(model.metadata && model.metadata.prepend) {
      container.prepend(itemView.el);

      if(itemView.notificationContent) {
        var message = itemView.notificationContent();
        this.notify(message);
      }
    } else {
      container.append(itemView.el);
    }
  },

  notify: function(message) {
    if(DashCat.settings("notificate") && typeof macgap != 'undefined') {
      macgap.growl.notify({
        title:   message.title,
        content: message.content
      });
    } else {
      console.log(message);
    }
  },

  onShow: function() {
    var view = this;

    if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      $("#content").css({ height: "100%" });
    }

    new iScroll("content", {
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
