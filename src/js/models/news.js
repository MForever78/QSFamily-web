/**
 * Created by MForever78 on 15/6/7.
 */

var NewsModel = Backbone.Model.extend({
  parse: function(response) {
    response.date = new Date(response.create_at);
    return response;
  }
});

module.exports = NewsModel;
