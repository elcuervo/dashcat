var PullRequestView = BaseItemView.extend({
  tagName: "li",

  template: "#pull-request-template",

  helpers: function() {
    return {
      time: moment(this.model.get("updated_at")).fromNow(),
      mergeState: "state-" + this.model.get("pull_info").mergeable_state
    }
  },

  initialize: function() {
    var pullRequestUrl = this.model.get("repository").url + "/pulls/" + this.model.get("number");
    var model = this.model;

    $.ajax({
      url: pullRequestUrl,
      async: false,
      success: function(response) {
        model.set({ pull_info: response }, { silent: true });
      }
    });
  }
});
