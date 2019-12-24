"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _http = _interopRequireDefault(require("./http"));

var _hoc = require("./hoc");

exports.combineApi = _hoc.combineApi;
exports.connectApi = _hoc.connectApi;
exports.connectApi2 = _hoc.connectApi2;
exports.ProviderApi = _hoc.ProviderApi;
var _default = _http["default"];
exports["default"] = _default;