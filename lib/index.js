"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
var _exportNames = {};
exports["default"] = void 0;

var _http = _interopRequireDefault(require("./http"));

var _hoc = require("./hoc");

Object.keys(_hoc).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _hoc[key]) return;
  exports[key] = _hoc[key];
});
var _default = _http["default"];
exports["default"] = _default;