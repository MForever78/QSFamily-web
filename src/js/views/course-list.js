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
      // active tab
      var tab = $(e.currentTarget);
      tab.addClass("active");
      tab.siblings().removeClass("active");
      // active tab content
      var content = $(e.target.attributes.href.value);
      content.siblings().removeClass("in");
      setTimeout(function() {
        content.siblings().removeClass("active");
        content.addClass("active in");
      }, 200);
    }
  },

  render: function() {
    var self = this;
    this.courseList.fetch({
      success: function(courseList) {
        var template = _.template($("#course-list-template").html());
        self.$el.html(template({courseList: courseList}));
        // active first tab
        $(".course-tab a").first().click();
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
