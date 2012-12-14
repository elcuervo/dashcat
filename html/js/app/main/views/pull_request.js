var PullRequestView = BaseItemView.extend({
  tagName: "li",

  template: "#pull-request-template",

  events: {
    "click .diff": "loadDiff"
  },

  helpers: function() {
    return {
      mergeState: "state-" + this.model.get("pull_info").mergeable_state
    }
  },

  loadDiff: function() {
    var diffUrl = this.model.get("pull_request").diff_url;
    var test = document.createElement("script");

    test.type = "text/diff";
    test.src = diffUrl;
    test.id = "bla";
    $(document).append(test);
    console.log(test);
  }
});
