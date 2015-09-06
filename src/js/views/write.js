/**
 * Created by MForever78 on 15/6/9.
 */

var NavView = require('./nav');

var WriteView = Backbone.View.extend({
  initialize: function(opt) {
    this.sessionModel = opt.sessionModel;
    this.itemModel = opt.itemModel;
    this.router = opt.router;
    this.render();
  },

  render: function() {
    var navView = NavView.instance || new NavView({
        sessionModel: this.sessionModel
    });
    navView.render({
      id: "write"
    });
    var template = _.template($("#write-template").html());
    this.$el.html(template({}));
    var self = this;
    $.getScript("/static/lib/simditor.min.js", function() {
      self.editor = new Simditor({
        textarea: $("#news-content")
      });
    });
  },

  events: {
    "click #news-submit": function(event) {
      event.preventDefault();
      var self = this;
      var data = {
        title  : $("#news-title").val(),
        content: this.editor.getValue()
      };
      this.itemModel.save(data, {
        success: function () {
          self.router.navigate('', { trigger: true });
        }
      });
    }
  }
});

module.exports = WriteView;
