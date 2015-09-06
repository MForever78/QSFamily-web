/**
 * Created by MForever78 on 15/6/12.
 */

var MessageView = require("./message");
var NavView = require("./nav");

var EditView = Backbone.View.extend({
  initialize: function(opt) {
    this.itemModel = opt.itemModel;
    this.sessionModel = opt.sessionModel;
    this.router = opt.router;
    this.render();
  },

  events: {
    "click #news-submit": "update"
  },

  render: function() {
    var navView = NavView.instance || new NavView({
      sessionModel: this.sessionModel
    });
    navView.render({
      id: 'edit'
    });
    var template = _.template($("#write-template").html());
    this.$el.html(template());
    var self = this;
    $.getScript("/static/lib/simditor.min.js")
      .done(function() {
        self.editor = new Simditor({
          textarea: $("#news-content")
        });
        self.itemModel.fetch({success: function(data) {
          $("#news-title").val(data.get('title'));
          self.editor.setValue(data.get('content'));
        }});
      })
      .fail(function() {
        console.log("simditor load failed");
      });
  },

  update: function() {
    var data = {
      title: $("#news-title").val(),
      content: this.editor.getValue()
    };
    var self = this;
    this.itemModel.save(data, {success: function() {
      var messageView = MessageView.instance || new MessageView({
          sessionModel: this.sessionModel
        });
      messageView.display({
        type: 'success',
        parent: $("#write-wrap"),
        message: "更新成功",
        icon: "checkmark"
      });
      setTimeout(function() {
        self.router.navigate("news/" + self.itemModel.id, { trigger: true })
      }, 600);
    }});
  }
});

module.exports = EditView;
