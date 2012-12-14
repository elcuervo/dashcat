var PullRequestView = BaseItemView.extend({
  tagName: "li",

  template: "#pull-request-template",

  ui: {
    mergeable: ".mergeable",
    commit: ".commit_merge"
  },

  events: {
    "click .diff_it":      "loadDiff",
    "click .merge_it":     "loadCommitBox",
    "click .cancel_merge": "cancelMerge",
    "form submit":         "mergeCommit"

  },

  helpers: function() {
    return {
      mergeState: "state-" + this.model.get("pull_info").mergeable_state
    }
  },

  loadDiff: function() {
    var diffUrl = this.model.get("pull_info").url;
    var getDiff = $.ajax({
      url: diffUrl,
      headers: { "Accept": "application/vnd.github.diff" },
    });

    getDiff.done(function(response) {
      console.log(response);
    });
  },

  loadCommitBox: function() {
    this.ui.mergeable.hide();
    this.ui.commit.show();
    this.ui.commit.find(".commit_message").focus();

    return false;
  },

  cancelMerge: function() {
    this.ui.mergeable.show();
    this.ui.commit.hide();

    return false;
  },

  mergeCommit: function() {
    return false;
  }
});
