/**
 * Created by MForever78 on 15/6/3.
 */

window.baseURL = "http://qsfamily.mforever78.com:3000";

var SessionModel = require('./models/session');
var sessionModel = new SessionModel({
  salt: '123456'
});

var NewsModel = require('./models/news');
var newsModel = new NewsModel({ sessionModel: sessionModel });

Backbone.ajax = function(request) {
  // Add auth header if user has logged in
  if (sessionModel.loggedIn()) {
    return $.ajax(_.extend(request, {
      headers: {
        Authorization: "Bearer " + sessionModel.get("token")
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
      sessionModel: sessionModel,
      newsModel: newsModel
    });
  },

  news: function(newsid) {
    var NewsView = require("./views/news");
    new NewsView({
      el: $("#main"),
      sessionModel: sessionModel,
      newsModel: newsModel,
      newsid: newsid,
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
    var WriteView = require('./views/write');
    new WriteView({
      el: $('#main'),
      sessionModel: sessionModel,
      newsModel: newsModel,
      router: this
    });
  },

  edit: function(newsid) {
    var EditView = require('./views/edit');
    new EditView({
      el: $('#main'),
      sessionModel: sessionModel,
      newsModel: newsModel,
      newsid: newsid,
      router: this
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
