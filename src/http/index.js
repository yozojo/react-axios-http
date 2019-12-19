/* 封装tdHttp拦截接口 */
import tdHttp from './http';
import { setOpt, extend } from './handler';

const apiFactory = (api, { prefix, host }) => {
  const url = host + prefix + api.url;
  return opt => {
    opt = setOpt({ ...api, opt });
    return tdHttp({
      ...api,
      ...opt,
      url,
    });
  };
};

const defineProperty = (target, props = []) => {
  props.forEach(prop => {
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
  opt = Object.assign(defaultOpt, opt);
  Global._TDHTTP_RESULT_MODE = opt.resultMode;

  extend(IO, tdHttp);
  Object.keys(apis).forEach(item => {
    IO[item] = apiFactory(apis[item], opt);
  });

  defineProperty(IO, ['interceptors', '_request']);

  return IO;
};

export default http;
