"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = _default;

var _es6Promise = _interopRequireDefault(require("es6-promise"));

var _jsonp2 = _interopRequireDefault(require("jsonp"));

function _default(config) {
  return new _es6Promise["default"](function (resolve, reject) {
    (0, _jsonp2["default"])(config.url, config.params, function (err, data) {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}