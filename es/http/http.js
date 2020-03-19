import _regeneratorRuntime from "@babel/runtime/regenerator";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import tdHttp from './core';
import Interceptor from './interceptor';
import { handleMethod, extend, isType } from '../utils';

function getAdapter(params) {
  var adapter = params.adapter,
      others = _objectWithoutPropertiesLoose(params, ["adapter"]);

  var method = handleMethod(params);

  var config = _extends({}, others, {
    method: method
  });

  var hasAdapter = isType(adapter, 'function');
  adapter = hasAdapter ? adapter : tdHttp[method];
  return {
    config: config,
    adapter: adapter,
    hasAdapter: hasAdapter
  };
}

var getResult = function getResult(params) {
  var _getAdapter, config, adapter, hasAdapter, data;

  return _regeneratorRuntime.async(function getResult$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _getAdapter = getAdapter(params), config = _getAdapter.config, adapter = _getAdapter.adapter, hasAdapter = _getAdapter.hasAdapter;
          _context.next = 3;
          return _regeneratorRuntime.awrap(adapter(config));

        case 3:
          data = _context.sent;
          return _context.abrupt("return", hasAdapter ? data : {
            config: config,
            data: data
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

function xhr(handler) {
  return function http(params) {
    var result, res;
    return _regeneratorRuntime.async(function http$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _regeneratorRuntime.awrap(getResult(params));

          case 2:
            result = _context2.sent;

            if (!isType(handler, 'function')) {
              _context2.next = 10;
              break;
            }

            res = handler(result);

            if (!isType(res, 'undefined')) {
              _context2.next = 9;
              break;
            }

            console.warn('请在加工函数中返回结果');
            _context2.next = 10;
            break;

          case 9:
            return _context2.abrupt("return", res);

          case 10:
            return _context2.abrupt("return", result);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
}

function Http() {
  this.interceptors = {
    request: new Interceptor(),
    response: new Interceptor()
  };
}

Http.prototype._request = function (params, handler) {
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
};

export default function createInstance() {
  var context = new Http();

  var instance = Http.prototype._request.bind(context);

  extend(instance, Http.prototype, context);
  extend(instance, context);
  return instance;
}