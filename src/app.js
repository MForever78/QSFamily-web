/**
 * Created by MForever78 on 15/5/10.
 */

require('normalize.css');
require('./app.less');
require('jquery');

var currentView = null;
var page = require('page');
var Vue = require('vue');

var router = {
  routing: function() {
    page("/", this.index);
    //page("/user", this.user);
    //page("/login", this.login);
    //page("*", this.notFound);
    page.start();
  },

  index: function() {
    require(['./view/index'], function(index) {
      loadView(index);
    });
  }

  /*
  user: function() {
    require(['./view/user'], function(user) {
      loadView(user);
    });
  },

  login: function() {
    require(['./view/login'], function(login) {
      loadView(login);
    });
  }
  */
};

function loadView(pageOpt) {
  if (currentView) {
    currentView.$destroy(true);
  }
  currentView = new Vue(pageOpt)
    .$mount()
    .$appendTo(document.body);
}

router.routing();
