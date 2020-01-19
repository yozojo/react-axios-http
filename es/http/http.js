import _regeneratorRuntime from "@babel/runtime/regenerator";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import tdHttp from './core';
import Interceptor from './interceptor';
import { handleMethod, extend, awaitWrap, isType } from '../utils';

function getAdapter(params) {
  var adapter = params.adapter,
      config = _objectWithoutPropertiesLoose(params, ["adapter"]);

  var method = handleMethod(params);
  var hasAdapter = isType(adapter, 'function');
  adapter = hasAdapter ? adapter : tdHttp[method];
  return {
    config: config,
    adapter: adapter,
    hasAdapter: hasAdapter
  };
}

function xhr(handler) {
  return function http(params) {
    var _getAdapter, config, adapter, hasAdapter, promise, _ref, err, res, result;

    return _regeneratorRuntime.async(function http$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _getAdapter = getAdapter(params), config = _getAdapter.config, adapter = _getAdapter.adapter, hasAdapter = _getAdapter.hasAdapter;
            _context.next = 3;
            return _regeneratorRuntime.awrap(adapter(config).then(function (data) {
              return hasAdapter ? data : {
                config: config,
                data: data
              };
            }));

          case 3:
            promise = _context.sent;

            if (!isType(handler, 'function')) {
              _context.next = 22;
              break;
            }

            _context.prev = 5;
            _context.next = 8;
            return _regeneratorRuntime.awrap(awaitWrap(promise));

          case 8:
            _ref = _context.sent;
            err = _ref[0];
            res = _ref[1];
            result = handler(res, err);

            if (!(result instanceof Promise)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", result);

          case 16:
            return _context.abrupt("return", Promise.resolve(result));

          case 17:
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](5);
            console.error(_context.t0);

          case 22:
            return _context.abrupt("return", promise);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[5, 19]]);
  };
}

function Http() {
  this.interceptors = {
    request: new Interceptor(),
    response: new Interceptor()
  };
}

Http.prototype._request = function (params, handler) {
  try {
    var chain = [xhr(handler), undefined];
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