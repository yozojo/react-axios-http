import _extends from "@babel/runtime/helpers/esm/extends";

/* 封装tdHttp拦截接口 */
import tdHttp from './http';
import { setOpt, extend } from './handler';

var apiFactory = function apiFactory(api, _ref) {
  var prefix = _ref.prefix,
      host = _ref.host;
  var url = host + prefix + api.url;
  return function (opt) {
    opt = setOpt(_extends({}, api, {
      opt: opt
    }));
    return tdHttp(_extends({}, api, {}, opt, {
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
  extend(IO, tdHttp);
  Object.keys(apis).forEach(function (item) {
    IO[item] = apiFactory(apis[item], opt);
  });
  defineProperty(IO, ['interceptors', '_request']);
  return IO;
};

export default http;