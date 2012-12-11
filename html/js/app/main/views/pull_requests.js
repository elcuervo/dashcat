var PullRequestsView = Backbone.Marionette.CollectionView.extend({
  id: "pull-requests",

  tagName: "ol",

  itemView: PullRequestView,

  template: "#pull-requests-template"
});
