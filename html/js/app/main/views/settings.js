var SettingsView = BaseItemView.extend({
  template: "#settings-template",

  viewEvents: {
    "change #notifications": "toggleNotifications"
  },

  helpers: function() {
    return {
      notificate: !!DashCat.settings("notificate")
    }
  },

  toggleNotifications: function(event) {
    var checkbox = event.target;

    DashCat.settings({ notificate: checkbox.checked });
  }
});
