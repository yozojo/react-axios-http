"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _get = _interopRequireDefault(require("./get"));

var _jsonp = _interopRequireDefault(require("./jsonp"));

var _post = _interopRequireDefault(require("./post"));

var _delete = _interopRequireDefault(require("./delete"));

var _put = _interopRequireDefault(require("./put"));

var _default = {
  Get: _get["default"],
  GetJsonp: _jsonp["default"],
  Post: _post["default"],
  Delete: _delete["default"],
  Put: _put["default"]
};
exports["default"] = _default;