"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _http = _interopRequireDefault(require("./http"));

var _handler = require("./handler");

var _global = _interopRequireDefault(require("../global"));

/* 封装tdHttp拦截接口 */
var apiFactory = function apiFactory(api) {
  var method = api.method,
      _api$isFormData = api.isFormData,
      isFormData = _api$isFormData === void 0 ? false : _api$isFormData,
      _api$isQuery = api.isQuery,
      isQuery = _api$isQuery === void 0 ? false : _api$isQuery;
  return function (opt) {
    opt = (0, _handler.dataOrParams)(method, opt, isFormData, isQuery);
    return (0, _http["default"])((0, _extends2["default"])({}, api, {}, opt));
  };
};

var defineProperty = function defineProperty(target, props) {
  if (props === void 0) {
    props = [];
  }

  props.forEach(function (prop) {
    Object.defineProperty(target, prop, {
      writable: false,
      enumerable: false,
      configurable: false
    });
  });
};

var http = function http(apis) {
  if (apis === void 0) {
    apis = {};
  }

  (0, _handler.extend)(_global["default"], _http["default"]);
  Object.keys(apis).forEach(function (item) {
    _global["default"][item] = apiFactory(apis[item]);
  });
  defineProperty(_global["default"], ['interceptors', '_request']);
  return _global["default"];
};

var _default = http;
exports["default"] = _default;