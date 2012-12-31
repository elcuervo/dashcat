var PullRequestView = BaseItemView.extend({
  tagName: "li",

  template: "#pull-request-template",

  ui: {
    mergeable: ".mergeable",
    commit: ".commit_merge",
    message: ".commit_message"
  },

  events: {
    "click .diff_it":      "loadDiff",
    "click .merge_it":     "loadCommitBox",
    "click .cancel_merge": "cancelMerge",
    "submit #merge_commit": "mergeCommit"
  },

  helpers: function() {
    var info = this.info = this.model.get("pull_info") || this.model.get("payload");
    var user = this.model.get("user") || info.user;
    var number = this.model.get("number") || info.number;
    var title = this.model.get("title") || info.title;
    var body = this.model.get("body") || info.body;
    var mergeable = this.model.get("mergeable") || info.mergeable;

    return {
      user: user,
      html_url: info.html_url,
      number: number,
      body: body,
      mergeable: mergeable,
      title: title,
      mergeState: "state-" + info.mergeable_state
    }
  },

  loadDiff: function() {
    var diffUrl = this.info.url;
    var getDiff = $.ajax({
      url: diffUrl,
      cache: false,
      headers: { "Accept": "application/vnd.github.diff" }
    });

    DashCat.Main.app.showLoadingScreen();
    getDiff.done(function(response) {
      var diffViewer = new DiffViewer({
        diffContent: response
      })
      DashCat.Main.app.content.show(diffViewer);
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

  mergeCommit: function(event) {
    event.preventDefault();

    var mergeUrl = this.info.url + "/merge";
    var message = this.ui.message.val();

    var merge = $.ajax({
      type: "PUT",
      url: mergeUrl,
      data: JSON.stringify({commit_message: message})
    });

    merge.done(_.bind(function(response) {
      this.close()
    }, this));
  }
});
