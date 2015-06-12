/**
 * Created by MForever78 on 15/6/12.
 */

var MessageView = require("./message");
var NavView = require("./nav");
var Simditor = require("simditor");

var EditView = Backbone.View.extend({
  initialize: function(opt) {
    this.newsModel = opt.newsModel;
    this.sessionModel = opt.sessionModel;
    this.router = opt.router;
    this.newsid = opt.newsid;
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
    this.editor = new Simditor({
      textarea: $("#news-content")
    });
    var self = this;
    this.newsModel.getNewsById(this.newsid)
      .then(function(data) {
        $("#news-title").val(data.news.title);
        self.editor.setValue(data.news.content);
      });
  },

  update: function() {
    var news = {
      title: $("#news-title").val(),
      content: this.editor.getValue()
    };
    var self = this;
    this.newsModel.updateNews(this.newsid, news)
      .then(function() {
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
          self.router.navigate("news/" + self.newsid, { trigger: true })
        }, 600);
      });
  }
});

module.exports = EditView;