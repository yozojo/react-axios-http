"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _http = _interopRequireDefault(require("./http"));

var _handler = require("./handler");

/* 封装tdHttp拦截接口 */
var apiFactory = function apiFactory(api, _ref) {
  var prefix = _ref.prefix,
      host = _ref.host;
  var url = host + prefix + api.url;
  return function (opt) {
    opt = (0, _handler.setOpt)((0, _extends2["default"])({}, api, {
      opt: opt
    }));
    return (0, _http["default"])((0, _extends2["default"])({}, api, {}, opt, {
      url: url
    }));
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

window._TDHTTP_RESULT_MODE = 'native';
var defaultOpt = {
  resultMode: 'native',
  host: '',
  prefix: ''
};
var IO = {};

var http = function http(apis, opt) {
  if (apis === void 0) {
    apis = {};
  }

  if (opt === void 0) {
    opt = {};
  }

  opt = Object.assign(defaultOpt, opt);
  window._TDHTTP_RESULT_MODE = opt.resultMode;
  (0, _handler.extend)(IO, _http["default"]);
  Object.keys(apis).forEach(function (item) {
    IO[item] = apiFactory(apis[item], opt);
  });
  defineProperty(IO, ['interceptors', '_request']);
  return IO;
};

var _default = http;
exports["default"] = _default;