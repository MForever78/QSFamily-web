/**
 * Created by MForever78 on 15/6/9.
 */

var Simditor = require('simditor');
var NavView = require('./nav');

var WriteView = Backbone.View.extend({
  initialize: function(opt) {
    this.sessionModel = opt.sessionModel;
    this.newsModel = opt.newsModel;
    this.router = opt.router;
    this.render();
  },

  render: function() {
    var navView = NavView.instance || new NavView({
        sessionModel: this.sessionModel
    });
    navView.render({
      id: "write"
    });
    var template = _.template($("#write-template").html());
    this.$el.html(template({}));
    this.editor = new Simditor({
      textarea: $("#news-content")
    });
  },

  events: {
    "click #news-submit": function(event) {
      event.preventDefault();
      var self = this;
      var title = $("#news-title").val();
      var content = this.editor.getValue();
      this.newsModel.postNews(title, content).then(function() {
        self.router.navigate('', { trigger: true });
      }).catch(function(err) {
        console.log("Post failed");
      });
    }
  }
});

module.exports = WriteView;
