import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";

/* 封装tdHttp拦截接口 */
import createHttpInstance from "./http";
import { Global, setOpt, extend, isType, stringifyQuery } from "../utils";
import forEach from "lodash/forEach";
import assign from "lodash/assign";
Global._TDHTTP_RESULT_MODE = "native";

var http = function http(apis, opt) {
  if (apis === void 0) {
    apis = {};
  }

  if (opt === void 0) {
    opt = {};
  }

  var tdHttp = createHttpInstance();
  var defaultOpt = {
    resultMode: "native",
    prefix: "",
    query: {}
  };
  var IO = {};

  var _assign = assign(defaultOpt, opt),
      resultMode = _assign.resultMode,
      others = _objectWithoutPropertiesLoose(_assign, ["resultMode"]);

  Global._TDHTTP_RESULT_MODE = resultMode;
  extend(IO, tdHttp);
  forEach(apis, function (api, key) {
    IO[key] = apiFactory(api, others, tdHttp);
  });
  defineProperty(IO, ["interceptors", "_request"]);
  return IO;
};

var setApi = function setApi(api, props, tdHttp) {
  var prefix = props.prefix,
      query = props.query,
      others = _objectWithoutPropertiesLoose(props, ["prefix", "query"]);

  var url = isType(api.url, "function") ? api.url(_extends({}, api, props)) : prefix + api.url + stringifyQuery(query);

  if (!isType(url, "string")) {
    throw new Error("url如果是函数传入请执行后return string类型");
  }

  var config = _extends({}, others, api, {
    url: url
  });

  function getData(opt, handler) {
    if (isType(opt, "function")) {
      handler = opt;
      opt = {};
    }

    opt = setOpt(_extends({}, api, {
      opt: opt
    }));
    return tdHttp(_extends({}, config, opt, {
      url: url
    }), handler);
  }

  getData.config = config;
  return getData;
};

var apiFactory = function apiFactory(api, opt, tdHttp) {
  if (isType(api, "object") && !api.url) {
    forEach(api, function (obj, key) {
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

  forEach(props, function (prop) {
    Object.defineProperty(target, prop, {
      writable: true,
      enumerable: false,
      configurable: false
    });
  });
};

export default http;