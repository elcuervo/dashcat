var DiffViewer = Backbone.Marionette.ItemView.extend({
  template: "#diff-viewer-template",

  events: {
    "click button.back": "back"
  },

  initialize: function(options) {
    this.content = options.diffContent;
  },

  back: function() {
  },

  templateHelpers: function() {
    return {
      diffy: _.pairs(new Diffy(this.content)),
      content: this.content
    }
  }
});
