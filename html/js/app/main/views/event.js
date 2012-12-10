var EventView = Backbone.Marionette.ItemView.extend({
  tagName: "li",

  events: {
    "click a": "openBrowser"
  },

  initialize: function() {
    var type = this.model.get("type");
    var templateName = type.match(/[A-Z][a-z]+/g).join("-").toLowerCase();

    this.template = "#" + templateName + "-template";
    if(!$(this.template).length) this.template = "#not-implemented-event-template";
  },

  openBrowser: function(event) {
    if(macgap) {
      event.preventDefault();
      macgap.app.open(event.currentTarget.href);
    }
  },

  templateHelpers: function() {
    var eventName = this.model.get("type").match(/[A-Z][a-z]+/g);
    var eventClass = eventName.slice(0, -1).join("-").toLowerCase();

    var helpers = {
      sha: function(sha) {
        return sha.substr(0,7);
      },

      cleanUrl: function(url) {
        return url.replace("api.", "").replace("/repos", "");
      },

      eventClass: eventClass
    }

    if(Helpers[this.model.get("type")]) {
      _.extend(helpers, Helpers[this.model.get("type")])
    }
    return helpers
  }
});

var Helpers = {
  PushEvent: {
    branch: function() {
      var parts = this.payload.ref.split("/");
      return parts.pop();
    }
  },

  GistEvent: {
    action: function(action) {
      return action + "d";
    }
  }
};
