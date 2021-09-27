"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _axiosMin = _interopRequireDefault(require("axios/dist/axios.min.js"));

var _assign = _interopRequireDefault(require("lodash/assign"));

var getXhr = function getXhr(method) {
  return function xhr(config) {
    var assignConfig = (0, _assign["default"])(config, {
      method: method.toLowerCase()
    });
    return new Promise(function (resolve, reject) {
      (0, _axiosMin["default"])(assignConfig).then(function (res) {
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
var _default = xhrs;
exports["default"] = _default;