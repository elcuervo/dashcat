var PullRequestsCollection = Backbone.Collection.extend({
  model: PullRequest,

  url: "https://api.github.com/orgs/newcontext/issues?filter=all",

  add: function(models, options) {
    var pullRequests = _.select(models, function(model) {
      return model.pull_request && model.pull_request.diff_url;
    });

    return Backbone.Collection.prototype.add.call(this, pullRequests, options)
  }
});
