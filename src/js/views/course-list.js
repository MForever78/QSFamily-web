var courseCollection = require('../collections/course-list');

var CourseListView = Backbone.View.extend({
  initialize: function(opt) {
    this.courseList = new courseCollection();
    this.sessionModel = opt.sessionModel;
    this.router = opt.router;
    this.render();
  },

  events: {
    "click .course-tab": function (e) {
      e.preventDefault();
      // active tab
      var tab = $(e.currentTarget);
      tab.addClass("active");
      tab.siblings().removeClass("active");
      // active tab content
      var content = $(e.target.attributes.href.value);
      // remove in first to let animation work
      content.siblings().removeClass("in");
      setTimeout(function () {
        content.siblings().removeClass("active");
        content.addClass("active in");
      }, 200);
    },
    "click a[data-action=edit]": function (e) {
      this.router.navigate("/edit/course/" + e.target.dataset.id, { trigger: true });
    },
    "click a[data-action=delete]": function (e) {
      var self = this;
      var course = this.courseList.get(e.target.dataset.id);
      course.destroy({success: function() {
        self.render();
      }});
    },
    "click a[data-action=new]": function() {
      this.router.navigate("/write/course", { trigger: true });
    }
  },

  render: function() {
    var self = this;
    var template = _.template($("#course-list-template").html());
    this.courseList.fetch({
      success: function(courseList) {
        var editable = self.sessionModel.isRole("teacher");
        self.$el.html(template({
          courseList: courseList,
          editable: editable
        }));
        // active first tab
        $(".course-tab a").first().click();
      }
    });
  }
});

module.exports = CourseListView;

