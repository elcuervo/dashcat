var DashCatCollection = Backbone.Collection.extend({
  initialize: function(options) {
    this.options = options;
    this.loading = $.Deferred();

    if(!!this.afterInitialize) this.afterInitialize.call(this);

    this.fetcher = this.fetch();
  },

  whenAll: function(promises) {
    return jQuery.when.apply(jQuery, promises).pipe(function() {
      return Array.prototype.slice.call(arguments);
    });
  },
});
