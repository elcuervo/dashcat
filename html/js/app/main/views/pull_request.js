var PullRequestView = Backbone.Marionette.ItemView.extend({
  tagName: "li",

  template: "#pull-request-template",

  emptyView: NothingToSeeView,

  events: {
    "click a": "openBrowser"
  },

  openBrowser: function(event) {
    if(macgap) {
      event.preventDefault();
      macgap.app.open(event.currentTarget.href);
    }
  },

  templateHelpers: function() {
    return {
      time: moment(this.model.get("updated_at")).fromNow(),

      visibilityClass: this.model.get("repository").private ? "private-action" : "public-action",

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
