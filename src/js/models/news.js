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
      self.sessionModel.ajax('news/' + id, {
        method: 'GET',
        data: {
          token: self.sessionModel.token
        }
      }).then(function(data) {
        resolve(data);
      });
    });
  },

  postNews: function(title, content) {
    var self = this;
    return new Promise(function(resolve) {
      self.sessionModel.ajax('news/post', {
        method: 'POST',
        data: JSON.stringify({
          token: self.sessionModel.token,
          title: title,
          content: content
        }),
        contentType: 'application/json'
      }).then(function () {
        resolve(null);
      });
    })
  },

  editNews: function(id, title, content) {
    var self = this;
    return new Promise(function(resolve) {
      self.sessionModel.ajax('news/edit', {
        method: 'POST',
        data: JSON.stringify({
          token: self.sessionModel.token,
          newsid: id,
          title: title,
          content: content
        }),
        contentType: 'application/json'
      }).then(function() {
        resolve(null);
      });
    });
  },

  deleteNews: function(id) {
    var self = this;
    return new Promise(function(resolve) {
      self.sessionModel.ajax('news/delete', {
        method: 'POST',
        data: JSON.stringify({
          token: self.sessionModel.token,
          newsid: id
        }),
        contentType: 'application/json'
      }).then(function() {
        resolve(null);
      });
    });
  },

  updateNews: function(id, news) {
    var self = this;
    return new Promise(function(resolve) {
      self.sessionModel.ajax('news/update', {
        method: 'POST',
        data: JSON.stringify({
          token: self.sessionModel.token,
          newsid: id,
          news: news
        }),
        contentType: 'application/json'
      }).then(function() {
        resolve(null);
      });
    });
  }
});

module.exports = NewsModel;
