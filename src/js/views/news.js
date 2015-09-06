/**
 * Created by MForever78 on 15/6/11.
 */

var MessageView = require("./message");
var NavView = require("./nav");

var NewsView = Backbone.View.extend({
  initialize: function(opt) {
    this.sessionModel = opt.sessionModel;
    this.router = opt.router;
    this.newsModel = opt.newsModel;
    this.render();
  },

  events: {
    "click #edit": "editNews",
    "click #delete": "deleteNews"
  },

  render: function() {
    var navView = NavView.instance || new NavView({
      sessionModel: this.sessionModel
    });
    navView.render({
      id: 'index'
    });
    var template = _.template($("#news-template").html());
    var self = this;
    this.newsModel.fetch({success: function(news) {
      var editable = self.sessionModel.profile.role === 'teacher';
      self.$el.html(template({
        editable: editable,
        news: news
      })).hide().fadeIn(300);
    }});
  },

  editNews: function(event) {
    event.preventDefault();
    this.router.navigate("edit/" + this.newsModel.id, { trigger: true });
  },

  deleteNews: function(event) {
    event.preventDefault();
    var self = this;
    this.newsModel.destroy({success: function() {
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
