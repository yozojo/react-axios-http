"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function Interceptor() {
  this.handlers = [];
}

Interceptor.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

Interceptor.prototype.forEach = function forEach(fn) {
  _lodash["default"].forEach(this.handlers, function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var _default = Interceptor;
exports["default"] = _default;