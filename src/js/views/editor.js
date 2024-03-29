/**
 * Created by MForever78 on 15/6/12.
 */

var EditorView = Backbone.View.extend({
  initialize: function(opt) {
    this.success = opt.success;
    this.error = opt.error;
    this.title = opt.title;
    this.content = opt.content;
    this.render();
  },

  events: {
    "click #news-submit": "submit"
  },

  render: function() {
    var template = _.template($("#write-template").html());
    this.$el.html(template());
    var self = this;
    $.getScript("/static/lib/simditor.min.js")
      .done(function() {
        self.editor = new Simditor({
          textarea: $("#news-content")
        });
        if (!self.model.isNew()) {
          self.model.fetch({success: function(data) {
            $("#news-title").val(data.get(self.title));
            self.editor.setValue(data.get(self.content));
          }});
        }
      })
      .fail(function() {
        console.log("simditor load failed");
      });
  },

  submit: function() {
    var data = {};
    data[this.title] = $("#news-title").val();
    data[this.content] = this.editor.getValue();
    this.model.save(data, {
      success: this.success,
      error  : this.error
    });
  }
});

module.exports = EditorView;
