"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _axios = _interopRequireDefault(require("axios"));

var _assign = _interopRequireDefault(require("lodash/assign"));

var GetJsonp = function GetJsonp(config) {
  return new Promise(function (resolve, reject) {
    _jsonp(config.url, config.params, function (err, data) {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

var getXhr = function getXhr(method) {
  return function xhr(config) {
    var assignConfig = (0, _assign["default"])(config, {
      method: method.toLowerCase()
    });
    return new Promise(function (resolve, reject) {
      (0, _axios["default"])(assignConfig).then(function (res) {
        resolve(res && res.status === 200 && res.data || {});
      })["catch"](function (error) {
        reject(error);
      });
    });
  };
};

var methods = ['Get', 'Post', 'Delete', 'Put'];
var xhrs = methods.reduce(function (prev, cur) {
  prev[cur] = getXhr(cur);
  return prev;
}, {});

var _default = (0, _extends2["default"])({}, xhrs, {
  GetJsonp: GetJsonp
});

exports["default"] = _default;