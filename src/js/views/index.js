var IndexView = Backbone.View.extend({
  initialize: function(opt) {
    this.sessionModel = opt.sessionModel;
    this.newsModel = opt.newsModel;
    this.render();
  },

  render: function() {
    $("#main-nav li.is-active").removeClass("is-active");
    $("#nav-index").addClass("is-active");
    if (this.sessionModel.loggedIn()) {
      $("#nav-login, #nav-signup").addClass("is-hidden");
    } else {
      $("#nav-login, #nav-signup").removeClass("is-hidden");
    }
    var self = this;
    this.newsModel.getNewsList().then(function(result) {
      var template = _.template($('#index-template').html());
      var newsList = result.map(function(news) {
        news.date = new Date(news.create_at);
        return news;
      });
      self.$el.html(template({ newsList: newsList }));
    });
  }
});

module.exports = IndexView;
