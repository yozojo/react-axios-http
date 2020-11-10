/* 封装tdHttp拦截接口 */
import createHttpInstance from './http';
import { Global, setOpt, extend, isType, stringifyQuery } from '../utils';
import _ from 'lodash';

Global._TDHTTP_RESULT_MODE = 'native';

const http = (apis = {}, opt = {}) => {
  const tdHttp = createHttpInstance();

  const defaultOpt = {
    resultMode: 'native',
    prefix: '',
    query: {},
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

const setApi = (api, { prefix, query, ...others }, tdHttp) => {
  const url = prefix + api.url + stringifyQuery(query);

  const config = {
    ...others,
    ...api,
    url
  }

  function getData(opt, handler) {
    if (isType(opt, 'function')) {
      handler = opt;
      opt = {};
    }
    opt = setOpt({ ...api, opt });

    return tdHttp(
      {
        ...config,
        ...opt,
        url,
      },
      handler,
    );
  }

  getData.config = config;

  return getData;
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
