/* 封装tdHttp拦截接口 */
import tdHttp from './http';
import { setOpt, extend, isType } from '../utils';
import _ from 'lodash';

const setApi = (api, { prefix, host }) => {
  const url = host + prefix + api.url;

  return (opt, handler) => {
    if (isType(handler, 'function')) {
      handler = opt;
      opt = {};
    }
    opt = setOpt({ ...api, opt });
    return tdHttp(
      {
        ...api,
        ...opt,
        url,
      },
      handler,
    );
  };
};

const apiFactory = (api, opt) => {
  if (isType(api, 'object') && !api.url) {
    _.forEach(api, (obj, key) => {
      api[key] = setApi(obj, opt);
    });
    return api;
  }

  return setApi(api, opt);
};

const defineProperty = (target, props = []) => {
  _.forEach(props, prop => {
    Object.defineProperty(target, prop, {
      writable: true,
      enumerable: false,
      configurable: false,
    });
  });
};

const Global = global || window;

Global._TDHTTP_RESULT_MODE = 'native';

const defaultOpt = {
  resultMode: 'native',
  host: '',
  prefix: '',
};

const IO = {};

const http = (apis = {}, opt = {}) => {
  opt = _.assign(defaultOpt, opt);
  Global._TDHTTP_RESULT_MODE = opt.resultMode;

  extend(IO, tdHttp);
  _.forEach(apis, (api, key) => {
    IO[key] = apiFactory(api, opt);
  });

  defineProperty(IO, ['interceptors', '_request']);

  return IO;
};

export default http;
