/**
 * Created by MForever78 on 15/6/1.
 */

var config = require('../config');
var baseURL = config.baseURL;
var Promise = require('bluebird');

var $ = require('jquery');

module.exports = fetch;

function fetch(method, url, data) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      type: method,
      url: baseURL + url,
      data: data,
      dataType: 'jsonp',
      success: function(result) {
        resolve(result);
      },
      error: function(err) {
        reject(err);
      }
    });
  });
}