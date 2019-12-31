"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = _default;

var _es6Promise = _interopRequireDefault(require("es6-promise"));

var _jsonp2 = _interopRequireDefault(require("jsonp"));

/**
 * jsonp 请求封装
 * @param config
 * param:指定 callback函数的参数名。默认就是callback
 * timeout: 超时时间 默认 60000
 * prefix：callback 函数的前缀 默认是 __jp
 * name：回调函数的方法名。如果不指定，则默认为 __jp0 __jp1，也就是前缀+自增数字
 */
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