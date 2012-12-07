var EventView = Backbone.Marionette.ItemView.extend({
  tagName: "li",

  initialize: function() {
    console.log(this.model.get("type"));
    switch(this.model.get("type")) {
      case "WatchEvent":
        this.template = "#watch-event-template";
        break;

      case "PushEvent":
        this.template = "#push-event-template";
        break;

      case "GistEvent":
        this.template = "#gist-event-template";
        break;
    }
  },

  templateHelpers: function() {
    var eventName = this.model.get("type").match(/[A-Z][a-z]+/g);
    var eventClass = eventName.slice(0, -1).join().toLowerCase();
    var helpers = {
      eventClass: eventClass
    }

    if(Helpers[this.model.get("type")]) {
      _.extend(helpers, Helpers[this.model.get("type")])
    }
    return helpers
  }
});

var Helpers = {
  GistEvent: {
    action: function(action) {
      return action + "d";
    }
  }
};
