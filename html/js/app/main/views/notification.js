var NotificationView = BaseItemView.extend({
  tagName: "li",

  initialize: function() {
    var type = this.model.get("subject").type;
    this.template = "#" + type.toLowerCase() + "-notification-template";
    if(!$(this.template).length) this.template = "#not-implemented-event-template";
  },

  helpers: function() {
    var eventName = this.model.get("subject").type.match(/[A-Z][a-z]+/g);
    var eventClass = eventName.slice(0, -1).join("-").toLowerCase();

    return {
      eventClass: eventClass
    }
  }

});
