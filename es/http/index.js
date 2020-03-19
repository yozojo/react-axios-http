import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import createHttpInstance from './http';
import { Global, setOpt, extend, isType } from '../utils';
import _ from 'lodash';
Global._TDHTTP_RESULT_MODE = 'native';

var http = function http(apis, opt) {
  if (apis === void 0) {
    apis = {};
  }

  if (opt === void 0) {
    opt = {};
  }

  var tdHttp = createHttpInstance();
  var defaultOpt = {
    resultMode: 'native',
    prefix: ''
  };
  var IO = {};

  var _$assign = _.assign(defaultOpt, opt),
      resultMode = _$assign.resultMode,
      others = _objectWithoutPropertiesLoose(_$assign, ["resultMode"]);

  Global._TDHTTP_RESULT_MODE = resultMode;
  extend(IO, tdHttp);

  _.forEach(apis, function (api, key) {
    IO[key] = apiFactory(api, others, tdHttp);
  });

  defineProperty(IO, ['interceptors', '_request']);
  return IO;
};

var setApi = function setApi(api, _ref, tdHttp) {
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

var apiFactory = function apiFactory(api, opt, tdHttp) {
  if (isType(api, 'object') && !api.url) {
    _.forEach(api, function (obj, key) {
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

  _.forEach(props, function (prop) {
    Object.defineProperty(target, prop, {
      writable: true,
      enumerable: false,
      configurable: false
    });
  });
};

export default http;