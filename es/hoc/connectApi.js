import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import React, { useMemo } from "react";
import { awaitWrap, isType } from "./utils";
import ReactContext from "./Context";
export default (function (WrapperComponent, apis) {
  if (apis === void 0) {
    apis = [];
  }

  apis = isType(apis, "string") ? [apis] : apis;
  var resultMode = window._TDHTTP_RESULT_MODE;

  var getResult = function getResult(func, cb, params) {
    var nativeHandler, _ref, err, res;

    return _regeneratorRuntime.async(function getResult$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            nativeHandler = function nativeHandler() {
              var res;
              return _regeneratorRuntime.async(function nativeHandler$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return _regeneratorRuntime.awrap(func(params));

                    case 2:
                      res = _context.sent;
                      return _context.abrupt("return", cb(res) || res);

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            };

            _context2.t0 = resultMode;
            _context2.next = _context2.t0 === "native" ? 4 : _context2.t0 === "array" ? 8 : 15;
            break;

          case 4:
            _context2.next = 6;
            return _regeneratorRuntime.awrap(nativeHandler());

          case 6:
            return _context2.abrupt("return", _context2.sent);

          case 8:
            _context2.next = 10;
            return _regeneratorRuntime.awrap(awaitWrap(func(params)));

          case 10:
            _ref = _context2.sent;
            err = _ref[0];
            res = _ref[1];
            return _context2.abrupt("return", cb(err, res) || [err, res]);

          case 15:
            _context2.next = 17;
            return _regeneratorRuntime.awrap(nativeHandler());

          case 17:
            return _context2.abrupt("return", _context2.sent);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    });
  };

  var handler = function handler(func, params, cb) {
    return _regeneratorRuntime.async(function handler$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (cb === void 0) {
              cb = function cb() {};
            }

            cb = isType(params, "function") ? params : cb;
            params = isType(params, "function") ? null : params;
            _context3.next = 5;
            return _regeneratorRuntime.awrap(getResult(func, cb, params));

          case 5:
            return _context3.abrupt("return", _context3.sent);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  };

  var ConnectApi = function ConnectApi(_ref2) {
    var contextApis = _ref2.contextApis,
        otherPorps = _objectWithoutPropertiesLoose(_ref2, ["contextApis"]);

    var connectApis = useMemo(function () {
      var IO = contextApis || {};
      var curApis = apis.reduce(function (pre, cur) {
        return (pre[cur] = IO[cur]) && pre;
      }, {});
      var apisObj = apis.length ? curApis : IO;
      apisObj = Object.entries(apisObj).reduce(function (pre, _ref3) {
        var key = _ref3[0],
            func = _ref3[1];
        return (pre[key] = function _callee(params, cb) {
          return _regeneratorRuntime.async(function _callee$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return _regeneratorRuntime.awrap(handler(func, params, cb));

                case 2:
                  return _context4.abrupt("return", _context4.sent);

                case 3:
                case "end":
                  return _context4.stop();
              }
            }
          });
        }) && pre;
      }, {});
      return apisObj;
    }, [contextApis]);
    return React.createElement(WrapperComponent, _extends({}, otherPorps, connectApis));
  };

  var Consumer = ReactContext.Consumer;
  return function (props) {
    return React.createElement(Consumer, null, function (contextApis) {
      return React.createElement(ConnectApi, _extends({
        contextApis: contextApis
      }, props));
    });
  };
});