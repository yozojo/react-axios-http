"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = combineApi;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../utils");

function combineApi(apis, isScope) {
  if (apis === void 0) {
    apis = {};
  }

  if (isScope === void 0) {
    isScope = true;
  }

  var apiArr = _utils.Global._TDHTTP_APIS = _lodash["default"].entries(apis);

  return _lodash["default"].reduce(apiArr, function (pre, _ref) {
    var key = _ref[0],
        value = _ref[1];
    return isScope ? (pre[key] = value) && pre : (0, _extends2["default"])({}, pre, value);
  }, {});
}