"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _forEach = _interopRequireDefault(require("lodash/forEach"));

function Interceptor() {
  this.handlers = [];
}

Interceptor.prototype.use = function (fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

Interceptor.prototype.forEach = function (fn) {
  (0, _forEach["default"])(this.handlers, function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var _default = Interceptor;
exports["default"] = _default;