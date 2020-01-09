"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _core = _interopRequireDefault(require("./core"));

var _interceptor = _interopRequireDefault(require("./interceptor"));

var _utils = require("../utils");

function xhr(method, handler) {
  return function http(params) {
    var promise, _ref, err, res, result;

    return _regenerator["default"].async(function http$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            promise = _core["default"][method](params);

            if (!(typeof handler === 'function')) {
              _context.next = 20;
              break;
            }

            _context.prev = 2;
            _context.next = 5;
            return _regenerator["default"].awrap((0, _utils.awaitWrap)(promise));

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
    request: new _interceptor["default"](),
    response: new _interceptor["default"]()
  };
}

Http.prototype._request = function (params, handler) {
  try {
    var method = (0, _utils.handleMethod)(params);
    var chain = [xhr(method, handler), undefined];
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

  (0, _utils.extend)(instance, Http.prototype, context);
  (0, _utils.extend)(instance, context);
  return instance;
}

var _default = createInstance();

exports["default"] = _default;