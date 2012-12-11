var NotificationsCollection = Backbone.Collection.extend({
  model: Notification,

  url: "https://api.github.com/notifications"
});
