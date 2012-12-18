var NotificationsCollection = DashCatEventsCollection.extend({
  model: Notification,

  url: "https://api.github.com/notifications",

  add: function(models, options) {
    var promises = [];

    _.each(models, function(notification) {
      var notificationUrl = notification.subject.url;

      var promise = $.ajax({
        url: notificationUrl,
        success: function(response) { notification.payload = response; }
      });

      promises.push(promise);
    });

    this.whenAll(promises).then(_.bind(function() {
      Backbone.Collection.prototype.add.call(this, models, options);
      this.loading.resolve();
    }, this));
  }
});
