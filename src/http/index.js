/* 封装tdHttp拦截接口 */
import tdHttp from './http';
import { dataOrParams, extend } from './handler';
import IO from '../global';

const apiFactory = api => {
  let { method, isFormData = false, isQuery = false } = api;
  return opt => {
    opt = dataOrParams(method, opt, isFormData, isQuery);
    return tdHttp({
      ...api,
      ...opt,
    });
  };
};

const defineProperty = (target, props = []) => {
  props.forEach(prop => {
    Object.defineProperty(target, prop, {
      writable: false,
      enumerable: false,
      configurable: false,
    });
  });
};

const http = (apis = {}) => {
  extend(IO, tdHttp);
  Object.keys(apis).forEach(item => {
    IO[item] = apiFactory(apis[item]);
  });

  defineProperty(IO, ['interceptors', '_request']);

  return IO;
};

export default http;
