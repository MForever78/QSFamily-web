var communicate = require('../../communicate');

module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      news: []
    }
  },
  compiled: function() {
    this.fetchNews();
  },
  methods: {
    fetchNews: function() {
      var self = this;
      communicate('get', 'news/', '')
        .then(function (result) {
          self.news = result;
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }
};