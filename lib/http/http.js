"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _core = _interopRequireDefault(require("./core"));

var _interceptor = _interopRequireDefault(require("./interceptor"));

var _handler = require("./handler");

function xhr(method) {
  return function http(params) {
    return _core["default"][method](params);
  };
}

function Http() {
  this.interceptors = {
    request: new _interceptor["default"](),
    response: new _interceptor["default"]()
  };
}

Http.prototype._request = function (params) {
  try {
    var method = (0, _handler.handleMethod)(params);
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

  (0, _handler.extend)(instance, Http.prototype, context);
  (0, _handler.extend)(instance, context);
  return instance;
}

var _default = createInstance();

exports["default"] = _default;