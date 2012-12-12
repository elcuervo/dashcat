var EventView = BaseItemView.extend({
  tagName: "li",

  initialize: function() {
    var type = this.model.get("type");
    var templateName = type.match(/[A-Z][a-z]+/g).join("-").toLowerCase();

    this.template = "#" + templateName + "-template";
    if(!$(this.template).length) this.template = "#not-implemented-event-template";
  },

  helpers : function() {
    var eventName = this.model.get("type").match(/[A-Z][a-z]+/g);
    var eventClass = eventName.slice(0, -1).join("-").toLowerCase();

    var helpers = {
      visibilityClass: this.model.get("public") ? "public-action" : "private-action",

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
