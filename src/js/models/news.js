/**
 * Created by MForever78 on 15/6/7.
 */

var NewsModel = Backbone.Model.extend({
  urlRoot: function() {
    return window.baseURL + '/news';
  },

  parse: function(response) {
    var news;
    if (response.code) {
      // model outside collection
      if (response.code === 200) {
        news = response.news;
      } else {
        return
      }
    } else {
      // collection
      news = response;
    }

    news.date = new Date(news.create_at);
    return news;
  }
});

module.exports = NewsModel;
