var NewsList = require("../collections/news-list");

var IndexView = Backbone.View.extend({
  initialize: function(opt) {
    this.sessionModel = opt.sessionModel;
    this.newsList = NewsList.instance || new NewsList;
    this.render();
  },

  render: function() {
    var self = this;
    var template = _.template($('#index-template').html());
    this.newsList.fetch({success: function(newsList) {
      self.$el.html(template({ newsList: newsList })).hide().fadeIn(300);
    }});
  }
});

module.exports = IndexView;
