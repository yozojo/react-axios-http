"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _http = _interopRequireDefault(require("./http"));

var _handler = require("./handler");

/* 封装tdHttp拦截接口 */
var apiFactory = function apiFactory(api) {
  var method = api.method,
      isFormData = api.isFormData;
  return function (opt) {
    opt = (0, _handler.dataOrParams)(method, opt, isFormData);
    return (0, _http["default"])((0, _extends2["default"])({}, api, {}, opt));
  };
};

function http(apis) {
  if (apis === void 0) {
    apis = {};
  }

  var IO = {};
  (0, _handler.extend)(IO, _http["default"]);
  Object.keys(apis).forEach(function (item) {
    IO[item] = apiFactory(apis[item]);
  });
  return IO;
}

var _default = http;
exports["default"] = _default;