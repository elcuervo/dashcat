var PullRequestsCollection = DashCatCollection.extend({
  model: PullRequest,

  url: "https://api.github.com/issues?filter=all",

  add: function(models, options) {
    var pullRequests = _.select(models, function(model) {
      return model.pull_request && model.pull_request.diff_url;
    });

    var promises = [];
    var mergedPullRequests = [];

    _.each(pullRequests, function(pullRequest) {
      var pullRequestUrl = pullRequest.repository.url + "/pulls/" + pullRequest.number;

      var promise = $.ajax({
        url: pullRequestUrl,
        success: function(response) {
          pullRequest.pull_info = response;

          if(response.merged) {
            mergedPullRequests.push(pullRequest);
          }
        }
      });

      promises.push(promise);
    });

    this.whenAll(promises).then(_.bind(function() {
      var openPullRequests = _.without(pullRequests, mergedPullRequests);

      Backbone.Collection.prototype.add.call(this, openPullRequests, options);
      this.loading.resolve();
    }, this));
  }
});
