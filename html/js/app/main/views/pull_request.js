var PullRequestView = Backbone.Marionette.ItemView.extend({
  tagName: "li",

  template: "#pull-request-template",

  emptyView: NothingToSeeView,

  templateHelpers: function() {
    return {
      mergeState: this.model.get("pull_info").mergeable ? "mergeable" : "not-mergeable"
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
