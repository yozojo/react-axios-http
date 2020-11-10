"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _http = _interopRequireDefault(require("./http"));

var _utils = require("../utils");

var _lodash = _interopRequireDefault(require("lodash"));

/* 封装tdHttp拦截接口 */
_utils.Global._TDHTTP_RESULT_MODE = 'native';

var http = function http(apis, opt) {
  if (apis === void 0) {
    apis = {};
  }

  if (opt === void 0) {
    opt = {};
  }

  var tdHttp = (0, _http["default"])();
  var defaultOpt = {
    resultMode: 'native',
    prefix: '',
    query: {}
  };
  var IO = {};

  var _$assign = _lodash["default"].assign(defaultOpt, opt),
      resultMode = _$assign.resultMode,
      others = (0, _objectWithoutPropertiesLoose2["default"])(_$assign, ["resultMode"]);

  _utils.Global._TDHTTP_RESULT_MODE = resultMode;
  (0, _utils.extend)(IO, tdHttp);

  _lodash["default"].forEach(apis, function (api, key) {
    IO[key] = apiFactory(api, others, tdHttp);
  });

  defineProperty(IO, ['interceptors', '_request']);
  return IO;
};

var setApi = function setApi(api, _ref, tdHttp) {
  var prefix = _ref.prefix,
      query = _ref.query,
      others = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["prefix", "query"]);
  var url = prefix + api.url + (0, _utils.stringifyQuery)(query);
  var config = (0, _extends2["default"])({}, others, api, {
    url: url
  });

  function getData(opt, handler) {
    if ((0, _utils.isType)(opt, 'function')) {
      handler = opt;
      opt = {};
    }

    opt = (0, _utils.setOpt)((0, _extends2["default"])({}, api, {
      opt: opt
    }));
    return tdHttp((0, _extends2["default"])({}, config, opt, {
      url: url
    }), handler);
  }

  getData.config = config;
  return getData;
};

var apiFactory = function apiFactory(api, opt, tdHttp) {
  if ((0, _utils.isType)(api, 'object') && !api.url) {
    _lodash["default"].forEach(api, function (obj, key) {
      api[key] = setApi(obj, opt, tdHttp);
    });

    return api;
  }

  return setApi(api, opt, tdHttp);
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

var _default = http;
exports["default"] = _default;