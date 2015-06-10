/**
 * Created by MForever78 on 15/6/6.
 */

var createHash = require('sha.js');
var MessageView = require('../views/message');

var SessionModel = Backbone.Model.extend({
  ajax: function(url, opt) {
    var self = this;
    return new Promise(function(resolve, reject) {
      _.extend(opt, {
        success: function(data) {
          if (data.code !== 200) {
            reject(data);
            if (data.code === 404 || data.code === 403) {
              self.logout();
              window.location.href = '/';
            }
          } else {
            resolve(data);
          }
        },
        error: function(err) {
          new MessageView({
            message: "网络请求错误, 请稍后再试",
            type: 'error',
            parent: $("#main")
          });
        },
        dataType: 'json',
        cache: false
      });
      $.ajax(self.baseURL + url, opt);
    });
  },

  initialize: function(opt) {
    this.baseURL = opt.baseURL;
    this.salt = opt.salt;
    this.token = localStorage.getItem("QSFamily-token");
    this.userid = localStorage.getItem("QSFamily-user-id");
  },

  loggedIn: function() {
    return this.token && this.userid;
  },

  login: function(role, username, password) {
    var self = this;
    return new Promise(function(resolve, reject) {
      var sha256 = createHash('sha256');
      self.ajax("login", {
        data: JSON.stringify({
          role: role,
          username: username,
          password: sha256.update(self.salt, 'utf8').update(password, 'utf8').digest('hex')
        }),
        method: 'POST',
        contentType: 'application/json'
      }).then(function(result) {
        self.token = result.token;
        self.userid = result.userid;
        self.saveStorage();
        resolve(null);
      }).catch(function(err) {
        reject(err);
      });
    });
  },

  logout: function() {
    localStorage.removeItem('QSFamily-token');
    localStorage.removeItem('QSFamily-user-id');
  },

  saveStorage: function() {
    localStorage.setItem('QSFamily-token', this.token);
    localStorage.setItem('QSFamily-user-id', this.userid);
  }
});

module.exports = SessionModel;
