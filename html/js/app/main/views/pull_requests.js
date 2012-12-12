var PullRequestsView = HeadTailAutoRefresh.extend({
  id: "pull-requests",

  itemView: PullRequestView,

  template: "#pull-requests-template"
});
