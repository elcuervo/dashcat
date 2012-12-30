var BasicEventView = BaseItemView.extend({
  tagName: "li",

  initialize: function() {
    var templateName = this.type().match(/[A-Z][a-z]+/g).join("-").toLowerCase();

    this.template = "#" + templateName + "-template";
    if(!$(this.template).length) this.template = "#not-implemented-event-template";
  },

  helpers: function() {
    var eventName = this.type().match(/[A-Z][a-z]+/g);
    var eventClass = eventName.slice(0, -1).join("-").toLowerCase();

    var helpers = {
      eventName: eventName,
      eventClass: eventClass
    };

    return _.extend(helpers, this.viewHelpers() || {});
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
