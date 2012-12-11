var EventView = Backbone.Marionette.ItemView.extend({
  tagName: "li",

  events: {
    "click a": "openBrowser"
  },

  initialize: function() {
    switch(true) {
      case !!this.model.get("type"):
        this.type = this.model.get("type");
        this.eventName = this.type.match(/[A-Z][a-z]+/g);
        var templateName = this.eventName.join("-").toLowerCase();
        break;

      case !!this.model.get("reason"):
        var templateName = this.model.get("reason");
        this.eventName = this.type = templateName;

        $.ajax({
          url: this.model.get("subject").latest_comment_url,
          async: false,
          success: _.bind(function(response) {
            this.model.set("comment", response);
          }, this)
        });

        break;
    }

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
     if(_.isArray(this.eventName)) {
       var eventClass =  this.eventName.slice(0, -1).join("-").toLowerCase();
     } else {
       var eventClass = this.eventName;
     }

    var helpers = {
      time: function(createdAt) {
        return moment(createdAt).fromNow();
      },

      sha: function(sha) {
        return sha.substr(0,7);
      },

      cleanUrl: function(url) {
        return url.replace("api.", "").replace("/repos", "");
      },

      visibilityClass: function() {
        return this.public ? "public-action" : "private-action";
      },

      eventClass: eventClass
    }

    if(Helpers[this.type]) {
      _.extend(helpers, Helpers[this.type])
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
