"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = combineApi;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var Global = global || window;

function combineApi(apis, isScope) {
  if (apis === void 0) {
    apis = {};
  }

  if (isScope === void 0) {
    isScope = true;
  }

  var apiArr = Global._TDHTTP_APIS = Object.entries(apis);
  return apiArr.reduce(function (pre, _ref) {
    var key = _ref[0],
        value = _ref[1];
    return isScope ? (pre[key] = value) && pre : (0, _extends2["default"])({}, pre, {}, value);
  }, {});
}