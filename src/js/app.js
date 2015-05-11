/**
 * Created by MForever78 on 15/5/10.
 */

var indexView = require("view/index");
var sessionModel = require("model/session");

var router = {
  routing: function() {
    page("/", this.index);
    page("/user", this.user);
    page("/login", this.login);
    page("*", this.notFound);
    page.start();
  },

  index: function() {

  },

  user: function() {

  },

  login: function() {

  }
};

router.routing();
