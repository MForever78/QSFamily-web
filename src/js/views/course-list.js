var courseCollection = require('../collections/course-list');
var NavView = require('./nav');

var CourseListView = Backbone.View.extend({
  initialize: function(opt) {
    this.courseList = new courseCollection();
    this.sessionModel = opt.sessionModel;
    this.render();
  },

  render: function() {
    this.courseList.fetch({
      success: function(data) {
        console.log(data);
      }
    });
    var navView = NavView.instance || new NavView({
      sessionModel: this.sessionModel
    });
    navView.render({
      id: 'course'
    });
    //var template = _.template($("#coursseList-template").html());
    //this.$el.html(template());
  }
});

module.exports = CourseListView;

