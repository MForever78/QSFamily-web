/**
 * Created by MForever78 on 15/6/9.
 */

var MessageView = Backbone.View.extend({
  initialize: function() {
    MessageView.instance = this;
  },

  display: function(opt) {
    $("#message").remove();
    var $el = $('<div/>', {
      id: 'message',
      class: 'ui message ' + opt.type,
      text: opt.message
    });
    if (opt.icon) {
      $el.prepend($('<i/>', {
        class: 'icon ' + opt.icon
      }));
    }
    $el.prependTo(opt.parent);
    if (opt.fadeOut) {
      $el.delay(600).fadeOut(300);
    }
  }
});

module.exports = MessageView;
