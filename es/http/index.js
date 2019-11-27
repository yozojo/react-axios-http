import _extends from "@babel/runtime/helpers/esm/extends";

/* 封装tdHttp拦截接口 */
import tdHttp from './http';
import { dataOrParams, extend } from './handler';
import IO from '../global';

var apiFactory = function apiFactory(api) {
  var method = api.method,
      _api$isFormData = api.isFormData,
      isFormData = _api$isFormData === void 0 ? false : _api$isFormData,
      _api$isQuery = api.isQuery,
      isQuery = _api$isQuery === void 0 ? false : _api$isQuery;
  return function (opt) {
    opt = dataOrParams(method, opt, isFormData, isQuery);
    return tdHttp(_extends({}, api, {}, opt));
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

  extend(IO, tdHttp);
  Object.keys(apis).forEach(function (item) {
    IO[item] = apiFactory(apis[item]);
  });
  defineProperty(IO, ['interceptors', '_request']);
  return IO;
};

export default http;