var PullRequestsCollection = Backbone.Collection.extend({
  model: PullRequest,

  url: "https://api.github.com/issues?filter=all",

  initialize: function() {
    this.loading = $.Deferred();
    this.fetch();
  },

  all: function(promises) {
    return jQuery.when.apply(jQuery, promises).pipe(function() {
      return Array.prototype.slice.call(arguments);
    });
  },

  add: function(models, options) {
    var pullRequests = _.select(models, function(model) {
      return model.pull_request && model.pull_request.diff_url;
    });

    var promises = [];
    _.each(pullRequests, function(pullRequest) {
      var pullRequestUrl = pullRequest.repository.url + "/pulls/" + pullRequest.number;

      var promise = $.ajax({
        url: pullRequestUrl,
        success: function(response) {
          pullRequest.pull_info = response;
        }
      });

      promises.push(promise);
    });

    this.all(promises).then(_.bind(function() {
      Backbone.Collection.prototype.add.call(this, pullRequests, options);
      this.loading.resolve();
    }, this));
  }
});
