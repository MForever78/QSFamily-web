/**
 * Created by MForever78 on 15/6/11.
 */

var MessageView = require("./message");

var NewsView = Backbone.View.extend({
  initialize: function(opt) {
    this.sessionModel = opt.sessionModel;
    this.router = opt.router;
    this.render();
  },

  events: {
    "click #edit": "editNews",
    "click #delete": "deleteNews"
  },

  render: function() {
    var template = _.template($("#news-template").html());
    var self = this;
    this.model.fetch({success: function(news) {
      var editable = self.sessionModel.isRole("teacher");
      self.$el.html(template({
        editable: editable,
        news: news
      })).hide().fadeIn(300);
    }});
  },

  editNews: function(event) {
    event.preventDefault();
    this.router.navigate("edit/news/" + this.model.id, { trigger: true });
  },

  deleteNews: function(event) {
    event.preventDefault();
    var self = this;
    this.model.destroy({success: function() {
      var messageView = MessageView.instance || new MessageView;
      messageView.display({
        type: 'success',
        message: "删除成功",
        parent: $("#post-wrap"),
        icon: "checkmark"
      });
      setTimeout(function() {
        self.router.navigate("", { trigger: true });
      }, 600);
    }});
  }
});

module.exports = NewsView;
