/**
 * Created by MForever78 on 15/6/8.
 */

var LoginView = Backbone.View.extend({
  initialize: function(opt) {
    this.sessionModel = opt.sessionModel;
    this.router = opt.router;
    this.render();
  },

  render: function() {
    $("#main-nav .is-active").removeClass("is-active");
    $("#nav-login").addClass("is-active");
    var template = _.template($("#login-template").html());
    this.$el.html(template({}));
  },

  events: {
    "click #submit": function(event) {
      event.preventDefault();
      var role = this.$el.find('#role .active').attr("data-role");
      var username = this.$el.find('#username').val();
      var password = this.$el.find('#password').val();
      var self = this;
      this.sessionModel.login(role, username, password).then(function() {
        self.router.navigate('', { trigger: true });
      }).catch(function(err) {
        console.log(err);
      });
    },

    "click #role .item": function(event) {
      var $this = $(event.target);
      $this.siblings(".active").removeClass("active");
      $this.addClass("active");
    },

    "click #role .item i": function(event) {
      event.preventDefault();
      $(event.target).parent().click();
    }
  }
});

module.exports = LoginView;
