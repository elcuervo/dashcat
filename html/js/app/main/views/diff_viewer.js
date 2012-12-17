var DiffViewer = Backbone.Marionette.ItemView.extend({
  template: "#diff-viewer-template",

  initialize: function(options) {
    this.content = options.diffContent;
  },

  templateHelpers: function() {
    return {
      content: this.content
    }
  }
});
