var SettingsView = Backbone.Marionette.ItemView.extend({
  template: "#settings-template",

  events: {
    "change #notifications": "toggleNotifications"
  },

  templateHelpers: function() {
    return {
      notificate: !!DashCat.settings("notificate")
    }
  },

  toggleNotifications: function(event) {
    var checkbox = event.target;

    DashCat.settings({ notificate: checkbox.checked });
  }
});
