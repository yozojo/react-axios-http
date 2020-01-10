import tdHttp from './core';
import Interceptor from './interceptor';
import { handleMethod, extend, awaitWrap } from '../utils';
import _ from 'lodash';

function xhr(method, handler) {
  return async function http(params) {
    const promise = tdHttp[method](params);
    if (typeof handler === 'function') {
      try {
        const [err, res] = await awaitWrap(promise);
        const result = handler(res, err);
        if ( result instanceof Promise) {
          return result;
        } else {
          console.warn('建议加工函数返回的是个Promise对象');
          return Promise.resolve(result);
        }
      } catch (error) {
        console.error(error);
      }
    }
    return promise;
  };
}

function Http() {
  this.interceptors = {
    request: new Interceptor(),
    response: new Interceptor(),
  };
}

Http.prototype._request = function(params, handler) {
  try {
    const method = handleMethod(params);
    let chain = [xhr(method, handler), undefined];
    let promise = Promise.resolve(params);

    _.forEach(this.interceptors.request, function(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    _.forEach(this.interceptors.response, function(interceptor) {
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
