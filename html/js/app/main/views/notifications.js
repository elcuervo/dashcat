var NotificationsView = HeadTailAutoRefresh.extend({
  id: "notifications",

  template: "#notifications-template",

  getItemView: function(item) {
    switch(item.get("subject").type) {
      case "PullRequest":
        return PullRequestView;

      default:
        return NotificationView;
    }
  },


});
