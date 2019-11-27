"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var IO = {};
window._TDHTTP_RESULT_MODE = 'native';
Object.defineProperty(IO, 'resultMode', {
  set: function set(value) {
    window._TDHTTP_RESULT_MODE = value;
  },
  get: function get() {
    return window._TDHTTP_RESULT_MODE;
  },
  enumerable: false,
  configurable: false
});
var _default = IO;
exports["default"] = _default;