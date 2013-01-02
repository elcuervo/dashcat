var BaseItemView = Backbone.Marionette.ItemView.extend({
  emptyView: NothingToSeeView,

  events: function() {
    return _.extend({
      "click a": "openBrowser"
    }, this.viewEvents || {})
  },

  openBrowser: function(event) {
    if(typeof macgap != "undefined") {
      event.preventDefault();
      macgap.app.open(event.currentTarget.href);
    }
  },

  templateHelpers: function() {
    var model = this.model;

    var defineVisibility = function() {
      var privateRepo = model.get("repository") && model.get("repository")["private"];

      if(!!model.get("public") || !privateRepo) {
        return "public-action";
      } else {
        return "private-action";
      }
    };

    var baseHelpers = {
      time: function(createdAt) {
        return moment(createdAt).fromNow();
      },

      creationTag: function(value) {
        return '<span class="created_at" data-time="' + value + '">' + this.time(value) + '</span>'
      },

      sha: function(sha) {
        return sha.substr(0,7);
      },

      cleanUrl: function(url) {
        return url.replace("api.", "").replace("/repos", "");
      },

      visibilityClass: defineVisibility()
    };

    if(this.helpers) {
      var helpers = typeof this.helpers == 'function' ? this.helpers() : this.helpers;
      _.extend(baseHelpers, helpers);
    }

    return baseHelpers;
  }
});
