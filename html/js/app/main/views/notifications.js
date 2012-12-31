var NotificationsView = HeadTailAutoRefresh.extend({
  id: "notifications",

  itemView: NotificationView,

  template: "#notifications-template",

  getItemView: function(item) {
    console.log(item);
    switch(item.get("subject").type) {
      case "PullRequest":
        return PullRequestView;

      default:
        return NotificationView;
    }
  }

});
