var EventView = Backbone.Marionette.ItemView.extend({
  tagName: "li",

  initialize: function() {
    var type = this.model.get("type");
    var templateName = type.match(/[A-Z][a-z]+/g).join("-").toLowerCase();

    this.template = "#" + templateName + "-template";
    if(!$(this.template).length) this.template = "#not-implemented-event-template";
  },

  templateHelpers: function() {
    var eventName = this.model.get("type").match(/[A-Z][a-z]+/g);
    var eventClass = eventName.slice(0, -1).join("-").toLowerCase();

    var helpers = {
      cleanUrl: function(url) {
        return url.replace("api.", "\1")
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
    sha: function(commit) {
      return commit.sha.substr(0,7);
    },

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
