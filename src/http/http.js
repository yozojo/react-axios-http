import tdHttp from '@tongdun/utils-http'
import Interceptor from './interceptor'
import { handleMethod, extend } from './handler'

function xhr(method) {
  return function http(params) {
    return tdHttp[method](params)
  }
}

function Http() {
  this.interceptors = {
    request: new Interceptor(),
    response: new Interceptor(),
  };
}

Http.prototype._request = function(params) {
  try {
    const method = handleMethod(params);
    let chain = [xhr(method), undefined];
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

  } catch (error) {
    return Promise.reject(error);
  }
};

function createInstance() {
  const context = new Http();
  const instance = Http.prototype._request.bind(context);
  extend(instance, Http.prototype, context);
  extend(instance, context);

  return instance;
}

export default createInstance();
