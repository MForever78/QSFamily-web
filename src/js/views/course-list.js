var courseCollection = require('../collections/course-list');
var NavView = require('./nav');

var CourseListView = Backbone.View.extend({
  initialize: function(opt) {
    this.courseList = new courseCollection();
    this.sessionModel = opt.sessionModel;
    this.render();
  },

  events: {
    "click .course-tab": function(e) {
      e.preventDefault();
      var tab = $(e.currentTarget);
      tab.addClass("active");
      tab.siblings().removeClass("active");
      var content = $(e.target.attributes.href.value);
      console.log(e.target.attributes);
      content.addClass("active");
      content.siblings().removeClass("active");
    }
  },

  render: function() {
    var self = this;
    this.courseList.fetch({
      success: function(courseList) {
        var template = _.template($("#course-list-template").html());
        self.$el.html(template({courseList: courseList}));
      }
    });
    var navView = NavView.instance || new NavView({
      sessionModel: this.sessionModel
    });
    navView.render({
      id: 'course'
    });
  }
});

module.exports = CourseListView;

