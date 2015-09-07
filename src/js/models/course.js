var courseModel = Backbone.Model.extend({
  urlRoot: function() {
    return window.baseURL + '/course';
  },

  parse: function(response) {
    if (response.code) {
      // model use outside collection
      if (response.code === 200) {
        return response.course;
      }
    }
    return response;
  }
});

module.exports = courseModel;
