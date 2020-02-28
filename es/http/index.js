import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";

/* 封装tdHttp拦截接口 */
import tdHttp from './http';
import { Global, setOpt, extend, isType } from '../utils';
import _ from 'lodash';

var setApi = function setApi(api, _ref) {
  var prefix = _ref.prefix,
      others = _objectWithoutPropertiesLoose(_ref, ["prefix"]);

  var url = prefix + api.url;
  return function (opt, handler) {
    if (isType(opt, 'function')) {
      handler = opt;
      opt = {};
    }

    opt = setOpt(_extends({}, api, {
      opt: opt
    }));
    return tdHttp(_extends({}, others, {}, api, {}, opt, {
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

Global._TDHTTP_RESULT_MODE = 'native';
var defaultOpt = {
  resultMode: 'native',
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

  var _$assign = _.assign(defaultOpt, opt),
      resultMode = _$assign.resultMode,
      others = _objectWithoutPropertiesLoose(_$assign, ["resultMode"]);

  Global._TDHTTP_RESULT_MODE = resultMode;
  extend(IO, tdHttp);

  _.forEach(apis, function (api, key) {
    IO[key] = apiFactory(api, others);
  });

  defineProperty(IO, ['interceptors', '_request']);
  return IO;
};

export default http;