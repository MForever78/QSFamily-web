/**
 * Created by MForever78 on 15/6/3.
 */

window.baseURL = "http://qsfamily.mforever78.com:3000";

var SessionModel = require('./models/session');
var sessionModel = new SessionModel({
  salt: '123456'
});

var NewsModel = require('./models/news');
var CourseModel = require('./models/course');
var MessageView = require('./views/message');

var NavView = require('./views/nav');
var navView = new NavView({
  sessionModel: sessionModel
});

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
    "write/news": "writeNews",
    "edit/news/:id": "editNews",
    "course": "courseList",
    "course/:id": "course",
    "write/course": "writeCourse",
    "edit/course/:id": "editCourse",

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
    navView.render({
      id: 'index'
    });
    var IndexView = require("./views/index");
    new IndexView({
      el: $('#main'),
      sessionModel: sessionModel
    });
  },

  news: function(newsid) {
    navView.render({
      id: 'index'
    });
    var NewsView = require("./views/news");
    new NewsView({
      el: $("#main"),
      sessionModel: sessionModel,
      model: new NewsModel({id: newsid}),
      router: this
    });
  },

  login: function() {
    navView.render({
      id: "login"
    });
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

  writeNews: function() {
    navView.render({
      id: "write"
    });
    var self = this;
    var EditorView = require('./views/editor');
    new EditorView({
      el: $('#main'),
      model: new NewsModel,
      title: "title",
      content: "content",
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

  editNews: function(newsid) {
    navView.render({
      id: "index"
    });
    var self = this;
    var EditorView = require('./views/editor');
    new EditorView({
      el: $('#main'),
      model: new NewsModel({id: newsid}),
      title: "title",
      content: "content",
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

  writeCourse: function() {
    navView.render({
      id: "index"
    });
    var self = this;
    var EditorView = require('./views/editor');
    new EditorView({
      el: $('#main'),
      model: new CourseModel,
      title: "course_name",
      content: "description",
      success: function() {
        var messageView = MessageView.instance || new MessageView({
            sessionModel: sessionModel
          });
        messageView.display({
          type: 'success',
          parent: $("#write-wrap"),
          message: "新建成功",
          icon: "checkmark"
        });
        setTimeout(function() {
          self.navigate("/course", { trigger: true });
        }, 600);
      }
    });
  },

  editCourse: function(courseId) {
    navView.render({
      id: "index"
    });
    var self = this;
    var EditorView = require('./views/editor');
    new EditorView({
      el: $('#main'),
      title: "course_name",
      content: "description",
      model: new CourseModel({id: courseId}),
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
          self.navigate("/course", { trigger: true });
        }, 600);
      }
    });
  },

  courseList: function() {
    navView.render({
      id: "course"
    });
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
