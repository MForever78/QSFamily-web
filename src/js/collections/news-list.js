/**
 * Created by MForever78 on 15/9/6.
 */

var NewsModel = require('../models/news');

var NewsList = Backbone.Collection.extend({
  initialize: function() {
    NewsList.instance = this;
  },

  url: function() {
    return window.baseURL + "/news";
  },

  parse: function(response) {
    if (response.code === 200) {
      return response.newsList;
    }
  },

  model: NewsModel
});

module.exports = NewsList;
