var BaseItemView = Backbone.Marionette.ItemView.extend({
  emptyView: NothingToSeeView,

  events: function() {
    return _.extend({
      "click a": "openBrowser"
    }, this.viewEvents || {})
  },

  openBrowser: function(event) {
    DashCat.system.openBrowser(event);
  },

  templateHelpers: function() {
    var model = this.model;
    var currentLanguage = DashCat.settings("language") || "en";
    var currentTemplate = this.template;

    var defineVisibility = function() {
      if(!model) return;
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

      t: i18n[currentLanguage][currentTemplate],

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
