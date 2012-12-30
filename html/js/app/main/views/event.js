var EventView = BasicEventView.extend({
  type: function() {
          console.warn(this.model)
    return this.model.get("type");
  },

  viewHelpers : function() {
    var helpers = {
      visibilityClass: this.model.get("public") ? "public-action" : "private-action",
    }

    if(Helpers[this.model.get("type")]) {
      _.extend(helpers, Helpers[this.model.get("type")])
    }

    return helpers;
  },

});
