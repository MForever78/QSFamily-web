/**
 * Created by MForever78 on 15/6/7.
 */

var NewsModel = Backbone.Model.extend({
  initialize: function(opt) {
    this.sessionModel = opt.sessionModel;
  },

  getNewsList: function() {
    var self = this;
    return new Promise(function(resolve) {
      self.sessionModel.ajax('news', {
        method: 'GET'
      }).then(function(newsList) {
        resolve(newsList.news);
      });
    });
  },

  getNewsById: function(id) {
    var self = this;
    return new Promise(function(resolve) {
      self.sessionModel.ajax('news', {
        method: 'GET',
        data: {
          newsid: id
        }
      }).then(function(news) {
        resolve(news);
      });
    });
  }
});

module.exports = NewsModel;
