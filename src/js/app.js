/**
 * Created by MForever78 on 15/6/3.
 */

window.baseURL = "http://qsfamily.mforever78.com:3000";

var SessionModel = require('./models/session');
var sessionModel = new SessionModel({
  salt: '123456'
});

var NewsModel = require('./models/news');
var MessageView = require('./views/message');

Backbone.ajax = function(request) {
  // Add auth header if user has logged in
  if (sessionModel.loggedIn()) {
    return $.ajax(_.extend(request, {
      headers: {
        Authorization: "Bearer " + sessionModel.token
      }
    }));
  }
  return $.ajax(request);
};

var Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "news/:id": "news",
    "login": "login",
    "logout": "logout",
    "write": "write",
    "edit/:id": "edit",
    "course": "courseList",
    "course/:id": "course",

    "*notFound": "notFound"
  },

  publicMethod: [
    "index",
    "news",
    "login"
  ],

  execute: function(callback, args, name) {
    if (this.publicMethod.indexOf(name) === -1 && !sessionModel.loggedIn()) {
      this.navigate('', {trigger: true});
      return false;
    }
    if (callback) callback.apply(this, args);
  },

  index: function() {
    var IndexView = require("./views/index");
    new IndexView({
      el: $('#main'),
      sessionModel: sessionModel
    });
  },

  news: function(newsid) {
    var NewsView = require("./views/news");
    new NewsView({
      el: $("#main"),
      sessionModel: sessionModel,
      newsModel: new NewsModel({id: newsid}),
      router: this
    });
  },

  login: function() {
    var LoginView = require("./views/login");
    new LoginView({
      el: $('#main'),
      sessionModel: sessionModel,
      router: this
    });
  },

  logout: function() {
    sessionModel.logout();
    window.location.href = '';
  },

  write: function() {
    var self = this;
    var EditorView = require('./views/editor');
    new EditorView({
      el: $('#main'),
      model: new NewsModel,
      success: function() {
        var messageView = MessageView.instance || new MessageView({
            sessionModel: sessionModel
          });
        messageView.display({
          type: 'success',
          parent: $("#write-wrap"),
          message: "发布成功",
          icon: "checkmark"
        });
        setTimeout(function() {
          self.navigate("/", { trigger: true });
        }, 600);
      }
    });
  },

  edit: function(newsid) {
    var self = this;
    var EditorView = require('./views/editor');
    new EditorView({
      el: $('#main'),
      model: new NewsModel({id: newsid}),
      success: function() {
        var messageView = MessageView.instance || new MessageView({
            sessionModel: sessionModel
          });
        messageView.display({
          type: 'success',
          parent: $("#write-wrap"),
          message: "更新成功",
          icon: "checkmark"
        });
        setTimeout(function() {
          self.navigate("/news/" + newsid, { trigger: true });
        }, 600);
      }
    });
  },

  courseList: function() {
    var CourseListView = require('./views/course-list.js');
    new CourseListView({
      el: $('#main'),
      sessionModel: sessionModel,
      router: this
    });
  },

  notFound: function() {
    window.location.href = '';
  }
});

$(function() {
  var router = new Router();

  Backbone.history.start({
    pushState: true,
    hashChange: false,
    root: $('base').attr('href')
  });
});
