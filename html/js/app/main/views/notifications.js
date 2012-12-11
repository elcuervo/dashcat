var NotificationsView = Backbone.Marionette.CollectionView.extend({
  tagName: "ol",

  itemView: NotificationView,

  emptyView: NothingToSeeView,

  template: "#notifications-template",
});
