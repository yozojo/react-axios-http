"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _react = _interopRequireWildcard(require("react"));

var _utils = require("./utils");

var _Context = _interopRequireDefault(require("./Context"));

var Global = global || window;

var getResult = function getResult(func, cb, params) {
  var resultMode, nativeHandler, _ref, err, res;

  return _regenerator["default"].async(function getResult$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          resultMode = Global._TDHTTP_RESULT_MODE;

          nativeHandler = function nativeHandler() {
            var res;
            return _regenerator["default"].async(function nativeHandler$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _regenerator["default"].awrap(func(params));

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
          _context2.next = _context2.t0 === 'native' ? 5 : _context2.t0 === 'array' ? 8 : 14;
          break;

        case 5:
          _context2.next = 7;
          return _regenerator["default"].awrap(nativeHandler());

        case 7:
          return _context2.abrupt("return", _context2.sent);

        case 8:
          _context2.next = 10;
          return _regenerator["default"].awrap((0, _utils.awaitWrap)(func(params)));

        case 10:
          _ref = _context2.sent;
          err = _ref[0];
          res = _ref[1];
          return _context2.abrupt("return", cb(err, res) || [err, res]);

        case 14:
          _context2.next = 16;
          return _regenerator["default"].awrap(nativeHandler());

        case 16:
          return _context2.abrupt("return", _context2.sent);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var handler = function handler(func, params, cb) {
  return _regenerator["default"].async(function handler$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (cb === void 0) {
            cb = function cb() {};
          }

          cb = (0, _utils.isType)(params, 'function') ? params : cb;
          params = (0, _utils.isType)(params, 'function') ? null : params;
          _context3.next = 5;
          return _regenerator["default"].awrap(getResult(func, cb, params));

        case 5:
          return _context3.abrupt("return", _context3.sent);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var getScope = function getScope(arr, IO) {
  try {
    var isDeep = (0, _utils.isType)(Object.values(IO)[0], 'object');

    var getDeep = function getDeep(obj, IO) {
      var cloneObj = {};
      Object.keys(obj).forEach(function (key) {
        cloneObj[key] = IO[key];
      });
      return cloneObj;
    };

    return arr.reduce(function (pre, _ref2) {
      var key = _ref2[0],
          obj = _ref2[1];
      var values = isDeep ? IO[key] : getDeep(obj, IO);
      return (0, _extends2["default"])({}, pre, {}, values);
    }, {});
  } catch (error) {
    console.error('tdhttp ==> connect: error ===> ' + error);
    return {};
  }
};

var _default = function _default(WrapperComponent, scope) {
  if (scope === void 0) {
    scope = [];
  }

  scope = (0, _utils.isType)(scope, 'string') ? [scope] : scope;

  var _TDHTTP_APIS = Global._TDHTTP_APIS || [];

  var scopeArr = _TDHTTP_APIS.filter(function (_ref3) {
    var key = _ref3[0];
    return scope.includes(key);
  });

  var ConnectApi = function ConnectApi(_ref4) {
    var contextApis = _ref4.contextApis,
        otherPorps = (0, _objectWithoutPropertiesLoose2["default"])(_ref4, ["contextApis"]);
    var connectApis = (0, _react.useMemo)(function () {
      var IO = contextApis || {};
      var scopeIO = scopeArr.length ? getScope(scopeArr, IO) : IO;
      return Object.entries(scopeIO).reduce(function (pre, _ref5) {
        var key = _ref5[0],
            func = _ref5[1];
        return (pre[key] = function _callee(params, cb) {
          return _regenerator["default"].async(function _callee$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return _regenerator["default"].awrap(handler(func, params, cb));

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
    }, [contextApis]);
    return _react["default"].createElement(WrapperComponent, (0, _extends2["default"])({}, otherPorps, connectApis));
  };

  var Consumer = _Context["default"].Consumer;
  return function (props) {
    return _react["default"].createElement(Consumer, null, function (contextApis) {
      return _react["default"].createElement(ConnectApi, (0, _extends2["default"])({
        contextApis: contextApis
      }, props));
    });
  };
};

exports["default"] = _default;