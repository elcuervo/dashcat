var EventView = Backbone.Marionette.ItemView.extend({
  tagName: "li",

  initialize: function() {
    switch(this.model.get("type")) {
      case "WatchEvent":
        this.template = "#watch-event-template";
        break;

      case "PushEvent":
        this.template = "#push-event-template";
        break;

      case "GistEvent":
        this.template = "#push-event-template";
        break;
    }
  },

  templateHelpers: function() {
    var eventName = this.model.get("type").match(/[A-Z][a-z]+/g);
    var eventClass = eventName.slice(0, -1).join().toLowerCase();

    return {
      eventClass: eventClass
    }
  }
});
