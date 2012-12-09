var AppLayout = Backbone.Marionette.Layout.extend({
  template: "#app-template",
  regions: {
    menu: "#menu",
    content: "#content"
  }
});
