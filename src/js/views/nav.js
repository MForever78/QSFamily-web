/**
 * Created by MForever78 on 15/6/10.
 */

var NavView = Backbone.View.extend({
  initialize: function(opt) {
    NavView.instance = this;
    this.sessionModel = opt.sessionModel;
    this.$el = $("#navbar");
  },

  navList: {
    visitor: [
      {
        id: "index",
        name: "首页",
        url: "/"
      },
      {
        id: "course",
        name: "课程",
        url: "/course"
      },
      //{
      //  id: "signup",
      //  name: "注册",
      //  url: "/signup"
      //},
      {
        id: "login",
        name: "登入",
        url: "/login"
      }
    ],
    teacher: [
      {
        id: "index",
        name: "首页",
        url: "/"
      },
      {
        id: "course",
        name: "课程",
        url: "/course"
      },
      {
        id: "write",
        name: "撰写公告",
        url: "/write"
      },
      {
        id: "logout",
        name: "登出",
        url: "/logout"
      }
    ]
  },

  render: function(opt) {
    var template = _.template($('#nav-template').html());
    if (this.sessionModel.loggedIn()) {
      this.$el.html(template({ navList: this.navList.teacher }));
    } else {
      this.$el.html(template({ navList: this.navList.visitor }));
    }
    this.$el.find("#nav-" + opt.id)
      .addClass("is-active")
      .siblings()
      .removeClass("is-active");
  }
});

module.exports = NavView;
