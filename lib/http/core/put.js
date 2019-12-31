"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = _default;

var _es6Promise = _interopRequireDefault(require("es6-promise"));

var _axios = _interopRequireDefault(require("axios"));

function _default(config) {
  var tempConfig = Object.assign(config, {
    method: 'PUT'
  });
  return new _es6Promise["default"](function (resolve, reject) {
    (0, _axios["default"])(tempConfig).then(function (res) {
      resolve(res && res.status === 200 && res.data || {});
    })["catch"](function (error) {
      reject(error);
    })["finally"](function () {// console.log('finally')
    });
  });
}