import createHttpInstance from './http';
import { Global, setOpt, extend, isType } from '../utils';
import _ from 'lodash';

Global._TDHTTP_RESULT_MODE = 'native';

const http = (apis = {}, opt = {}) => {
  const tdHttp = createHttpInstance();

  const defaultOpt = {
    resultMode: 'native',
    prefix: '',
  };

  const IO = {};

  const { resultMode, ...others } = _.assign(defaultOpt, opt);
  Global._TDHTTP_RESULT_MODE = resultMode;

  extend(IO, tdHttp);
  _.forEach(apis, (api, key) => {
    IO[key] = apiFactory(api, others, tdHttp);
  });

  defineProperty(IO, ['interceptors', '_request']);

  return IO;
};

const setApi = (api, { prefix, ...others }, tdHttp) => {
  const url = prefix + api.url;

  return (opt, handler) => {
    if (isType(opt, 'function')) {
      handler = opt;
      opt = {};
    }
    opt = setOpt({ ...api, opt });
    return tdHttp(
      {
        ...others,
        ...api,
        ...opt,
        url,
      },
      handler,
    );
  };
};

const apiFactory = (api, opt, tdHttp) => {
  if (isType(api, 'object') && !api.url) {
    _.forEach(api, (obj, key) => {
      api[key] = setApi(obj, opt, tdHttp);
    });
    return api;
  }

  return setApi(api, opt, tdHttp);
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

export default http;