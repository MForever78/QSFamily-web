var courseModel = require("../models/course");

var courseCollection = Backbone.Collection.extend({
  url: function() {
    return window.baseURL + '/course';
  },

  parse: function(response) {
    if (response.code === 200) {
      return response.courseList;
    }
  },

  model: courseModel
});

module.exports = courseCollection;
