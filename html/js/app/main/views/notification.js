var NotificationView = BasicEventView.extend({
  type: function() {
    var type = this.model.get("subject").type;
    if(type == "PullRequest") type = "PullRequestEvent";
    if(type == "Issue") type = "IssueCommentEvent";

    return type;
  },

  viewHelpers: function() {
    var helpers = {
      user: this.model.get("payload").user,
      actor: this.model.get("payload").user,
      created_at: this.model.get("updated_at"),
      repo: this.model.get("repository")
    }

    return helpers;
  }
});
