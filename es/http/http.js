import _regeneratorRuntime from "@babel/runtime/regenerator";
import tdHttp from './core';
import Interceptor from './interceptor';
import { handleMethod, extend, awaitWrap } from './handler';

function xhr(method, handler) {
  return function http(params) {
    var promise, _ref, err, res, result;

    return _regeneratorRuntime.async(function http$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            promise = tdHttp[method](params);

            if (!(typeof handler === 'function')) {
              _context.next = 20;
              break;
            }

            _context.prev = 2;
            _context.next = 5;
            return _regeneratorRuntime.awrap(awaitWrap(promise));

          case 5:
            _ref = _context.sent;
            err = _ref[0];
            res = _ref[1];
            result = handler(res, err);

            if (!(result instanceof Promise)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", result);

          case 13:
            console.warn('建议加工函数返回的是个Promise对象');
            return _context.abrupt("return", Promise.resolve(result));

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](2);
            console.error(_context.t0);

          case 20:
            return _context.abrupt("return", promise);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 17]]);
  };
}

function Http() {
  this.interceptors = {
    request: new Interceptor(),
    response: new Interceptor()
  };
}

Http.prototype._request = function (params) {
  try {
    var method = handleMethod(params);
    var chain = [xhr(method), undefined];
    var promise = Promise.resolve(params);
    this.interceptors.request.forEach(function (interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.forEach(function (interceptor) {
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
  var context = new Http();

  var instance = Http.prototype._request.bind(context);

  extend(instance, Http.prototype, context);
  extend(instance, context);
  return instance;
}

export default createInstance();