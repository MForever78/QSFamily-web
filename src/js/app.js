/**
 * Created by MForever78 on 15/6/3.
 */

var SessionModel = require('./models/session');
var sessionModel = new SessionModel({
  baseURL: 'http://127.0.0.1:3000/',
  salt: '123456'
});

var NewsModel = require('./models/news');
var newsModel = new NewsModel({ sessionModel: sessionModel });

var Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "news/:id": "news",
    "login": "login",
    "logout": "logout",
    "write": "write",
    "edit/:id": "edit"

    //"*notFound": "notFound"
  },

  /*
  execute: function(callback, args, name) {
    if (!sessionModel.loggedIn()) {
      this.navigate('', {trigger: true});
      return false;
    }
    if (callback) callback.apply(this, args);
  },
  */

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
  }

  /*
  notFound: function() {
    var notFoundView = require("./views/notFoundView");
    new notFoundView({
      el: $('#main')
    });
  }
  */
});

$(function() {
  var router = new Router();
  
  Backbone.history.start({
    pushState: true,
    hashChange: false,
    root: $('base').attr('href')
  });
});
