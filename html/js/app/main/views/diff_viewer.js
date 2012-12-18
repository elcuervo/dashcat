var DiffViewer = Backbone.Marionette.ItemView.extend({
  template: "#diff-viewer-template",

  events: {
    "click button.back": "back"
  },

  initialize: function(options) {
    this.content = options.diffContent;
  },

  back: function() {
    DashCat.Main.app.content.show(
      DashCat.Main.app.pullRequestsView
    );
    return false;
  },

  templateHelpers: function() {
    return {
      diffy: _.pairs(new Diffy(this.content)),
      content: this.content
    }
  }
});
