import tdHttp from './core';
import Interceptor from './interceptor';
import { handleMethod, extend, isType } from '../utils';

function getAdapter(params) {
  let { adapter, ...others } = params;
  const method = handleMethod(params);
  const config = { ...others, method };

  const hasAdapter = isType(adapter, 'function');
  adapter = hasAdapter ? adapter : tdHttp[method];

  return {
    config,
    adapter,
    hasAdapter,
  };
}

const getResult = async params => {
  const { config, adapter, hasAdapter } = getAdapter(params);
  const data = await adapter(config);

  return hasAdapter
    ? data
    : {
        config,
        data,
      };
};

function xhr(handler) {
  return async function http(params) {
    const result = await getResult(params);

    if (isType(handler, 'function')) {
      const res = handler(result);
      if (isType(res, 'undefined')) {
        console.warn('请在加工函数中返回结果');
      } else {
        return res;
      }
    }
    return result;
  };
}

function Http() {
  this.interceptors = {
    request: new Interceptor(),
    response: new Interceptor(),
  };
}

Http.prototype._request = function(params, handler) {
  let chain = [xhr(handler), undefined];
  let promise = Promise.resolve(params);

  this.interceptors.request.forEach(function(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

function createInstance() {
  const context = new Http();
  const instance = Http.prototype._request.bind(context);
  extend(instance, Http.prototype, context);
  extend(instance, context);

  return instance;
}

export default createInstance();
