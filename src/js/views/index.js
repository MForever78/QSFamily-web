var NavView = require("./nav");

var IndexView = Backbone.View.extend({
  initialize: function(opt) {
    this.sessionModel = opt.sessionModel;
    this.newsModel = opt.newsModel;
    this.render();
  },

  render: function() {
    var navView = NavView.instance || new NavView({
        sessionModel: this.sessionModel
    });
    navView.render({
      id: 'index'
    });
    var self = this;
    this.newsModel.getNewsList().then(function(result) {
      var template = _.template($('#index-template').html());
      var newsList = result.map(function(news) {
        news.date = new Date(news.create_at);
        return news;
      });
      self.$el.html(template({ newsList: newsList })).hide().fadeIn(300);
    });
  }
});

module.exports = IndexView;
