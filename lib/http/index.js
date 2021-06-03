"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _http = _interopRequireDefault(require("./http"));

var _utils = require("../utils");

var _forEach = _interopRequireDefault(require("lodash/forEach"));

var _assign2 = _interopRequireDefault(require("lodash/assign"));

/* 封装tdHttp拦截接口 */
_utils.Global._TDHTTP_RESULT_MODE = "native";

var http = function http(apis, opt) {
  if (apis === void 0) {
    apis = {};
  }

  if (opt === void 0) {
    opt = {};
  }

  var tdHttp = (0, _http["default"])();
  var defaultOpt = {
    resultMode: "native",
    prefix: "",
    query: {}
  };
  var IO = {};

  var _assign = (0, _assign2["default"])(defaultOpt, opt),
      resultMode = _assign.resultMode,
      others = (0, _objectWithoutPropertiesLoose2["default"])(_assign, ["resultMode"]);

  _utils.Global._TDHTTP_RESULT_MODE = resultMode;
  (0, _utils.extend)(IO, tdHttp);
  (0, _forEach["default"])(apis, function (api, key) {
    IO[key] = apiFactory(api, others, tdHttp);
  });
  defineProperty(IO, ["interceptors", "_request"]);
  return IO;
};

var setApi = function setApi(api, props, tdHttp) {
  var prefix = props.prefix,
      query = props.query,
      others = (0, _objectWithoutPropertiesLoose2["default"])(props, ["prefix", "query"]);
  var url = (0, _utils.isType)(api.url) === "function" ? api.url((0, _extends2["default"])({}, api, props)) : prefix + api.url + (0, _utils.stringifyQuery)(query);

  if ((0, _utils.isType)(url) !== "string") {
    return console.warn("url如果是函数传入请执行后return string类型");
  }

  var config = (0, _extends2["default"])({}, others, api, {
    url: url
  });

  function getData(opt, handler) {
    if ((0, _utils.isType)(opt, "function")) {
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
  if ((0, _utils.isType)(api, "object") && !api.url) {
    (0, _forEach["default"])(api, function (obj, key) {
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

  (0, _forEach["default"])(props, function (prop) {
    Object.defineProperty(target, prop, {
      writable: true,
      enumerable: false,
      configurable: false
    });
  });
};

var _default = http;
exports["default"] = _default;