import _extends from "@babel/runtime/helpers/esm/extends";

/* 封装tdHttp拦截接口 */
import tdHttp from './http';
import { setOpt, extend, isType } from '../utils';
import _ from 'lodash';

var setApi = function setApi(api, _ref) {
  var prefix = _ref.prefix,
      host = _ref.host;
  var url = host + prefix + api.url;
  return function (opt, handler) {
    if (isType(handler, 'function')) {
      handler = opt;
      opt = {};
    }

    opt = setOpt(_extends({}, api, {
      opt: opt
    }));
    return tdHttp(_extends({}, api, {}, opt, {
      url: url
    }), handler);
  };
};

var apiFactory = function apiFactory(api, opt) {
  if (isType(api, 'object') && !api.url) {
    _.forEach(api, function (obj, key) {
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

  _.forEach(props, function (prop) {
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

  opt = _.assign(defaultOpt, opt);
  Global._TDHTTP_RESULT_MODE = opt.resultMode;
  extend(IO, tdHttp);

  _.forEach(apis, function (api, key) {
    IO[key] = apiFactory(api, opt);
  });

  defineProperty(IO, ['interceptors', '_request']);
  return IO;
};

export default http;