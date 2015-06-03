var communicate = require('../../communicate');
var Simditor = require('simditor');
var $ = require('jquery');

require('./simditor.css');

module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function() {
    return {
      title: "",
      content: "",
      message: ""
    }
  },
  ready: function() {
    this.newEditor();
  },
  methods: {
    newEditor: function() {
      var editor = new Simditor({
        textarea: $('#editor')
      });
    },
    submitNews: function(e) {
      e.preventDefault();
      var self = this;
      var data = {
        title: this.title,
        content: this.content
      };
      communicate('post', 'newPost/', data)
        .then(function(result) {
          if (result.code == 200) {
            self.message = message.ok;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};