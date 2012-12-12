var PullRequestView = BaseItemView.extend({
  tagName: "li",

  template: "#pull-request-template",

  helpers: function() {
    return {
      mergeState: "state-" + this.model.get("pull_info").mergeable_state
    }
  }
});
