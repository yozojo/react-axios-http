"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _http = _interopRequireDefault(require("./http"));

var _utils = require("../utils");

var _lodash = _interopRequireDefault(require("lodash"));

/* 封装tdHttp拦截接口 */
var setApi = function setApi(api, _ref) {
  var prefix = _ref.prefix,
      host = _ref.host;
  var url = host + prefix + api.url;
  return function (opt, handler) {
    if (typeof opt === 'function') {
      handler = opt;
      opt = {};
    }

    ;
    opt = (0, _utils.setOpt)((0, _extends2["default"])({}, api, {
      opt: opt
    }));
    return (0, _http["default"])((0, _extends2["default"])({}, api, {}, opt, {
      url: url
    }), handler);
  };
};

var apiFactory = function apiFactory(api, opt) {
  if ((0, _utils.isType)(api, 'object') && !api.url) {
    _lodash["default"].forEach(_lodash["default"].entries(api), function (_ref2) {
      var key = _ref2[0],
          obj = _ref2[1];
      api[key] = setApi(obj, opt);
    });

    return api;
  }

  return setApi(api, opt);
};

var defineProperty = function defineProperty(target, props) {
  if (props === void 0) {
    props = [];
  }

  _lodash["default"].forEach(props, function (prop) {
    Object.defineProperty(target, prop, {
      writable: true,
      enumerable: false,
      configurable: false
    });
  });
};

var Global = global || window;
Global._TDHTTP_RESULT_MODE = 'native';
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

  opt = _lodash["default"].assign(defaultOpt, opt);
  Global._TDHTTP_RESULT_MODE = opt.resultMode;
  (0, _utils.extend)(IO, _http["default"]);

  _lodash["default"].forEach(_lodash["default"].keys(apis), function (item) {
    IO[item] = apiFactory(apis[item], opt);
  });

  defineProperty(IO, ['interceptors', '_request']);
  return IO;
};

var _default = http;
exports["default"] = _default;