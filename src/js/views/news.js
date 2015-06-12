/**
 * Created by MForever78 on 15/6/11.
 */

var MessageView = require("./message");
var NavView = require("./nav");

var NewsView = Backbone.View.extend({
  initialize: function(opt) {
    this.sessionModel = opt.sessionModel;
    this.newsModel = opt.newsModel;
    this.newsid = opt.newsid;
    this.router = opt.router;
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
    this.newsModel.getNewsById(this.newsid)
      .then(function(data) {
        data.news.date = new Date(data.news.create_at);
        var editable = data.role === 'teacher';
        self.$el.html(template({
          editable: editable,
          news: data.news
        })).hide().fadeIn(300);
      });
  },

  editNews: function(event) {
    event.preventDefault();
    this.router.navigate("edit/" + this.newsid, { trigger: true });
  },

  deleteNews: function(event) {
    event.preventDefault();
    var self = this;
    this.newsModel.deleteNews(this.newsid)
      .then(function() {
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
      });
  }
});

module.exports = NewsView;
