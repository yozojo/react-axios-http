"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireWildcard(require("react"));

var _values = _interopRequireDefault(require("lodash/values"));

var _forEach = _interopRequireDefault(require("lodash/forEach"));

var _isEmpty = _interopRequireDefault(require("lodash/isEmpty"));

var _reduce = _interopRequireDefault(require("lodash/reduce"));

var _assign = _interopRequireDefault(require("lodash/assign"));

var _filter = _interopRequireDefault(require("lodash/filter"));

var _includes = _interopRequireDefault(require("lodash/includes"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _utils = require("../utils");

var _context4 = _interopRequireDefault(require("./context"));

var getResult = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(func, params, handler, resultMode) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = resultMode;
            _context.next = _context.t0 === "native" ? 3 : _context.t0 === "array" ? 6 : 9;
            break;

          case 3:
            _context.next = 5;
            return func(params, handler);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
            _context.next = 8;
            return (0, _utils.awaitWrap)(func(params, handler));

          case 8:
            return _context.abrupt("return", _context.sent);

          case 9:
            _context.next = 11;
            return func(params, handler);

          case 11:
            return _context.abrupt("return", _context.sent);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getResult(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var getScope = function getScope(arr, IO, isScope) {
  if (isScope === void 0) {
    isScope = false;
  }

  try {
    var isDeep = (0, _utils.isType)((0, _values["default"])(IO)[0], "object");

    var getDeep = function getDeep(obj, IO) {
      var cloneObj = {};
      (0, _forEach["default"])(obj, function (value, key) {
        cloneObj[key] = IO[key];
      });
      return cloneObj;
    };

    if ((0, _isEmpty["default"])(arr)) return IO;
    return (0, _reduce["default"])(arr, function (pre, _ref2) {
      var _extends2;

      var key = _ref2[0],
          obj = _ref2[1];
      var values = isDeep ? IO[key] : getDeep(obj, IO);
      return isScope ? (0, _extends3["default"])({}, pre, (_extends2 = {}, _extends2[key] = values, _extends2)) : (0, _extends3["default"])({}, pre, values);
    }, {});
  } catch (error) {
    console.error("tdhttp ==> connect: error ===> " + error);
    return IO;
  }
};

var getIsScope = function getIsScope(arr, IO, isScope) {
  if (isScope === void 0) {
    isScope = false;
  }

  if (isScope) {
    return getScope(arr, IO, isScope);
  } else {
    return IO;
  }
};

var getOption = function getOption(scope, IO) {
  var resultMode = _utils.Global._TDHTTP_RESULT_MODE;
  var apis = _utils.Global._TDHTTP_APIS || [];
  var option = {
    resultMode: resultMode,
    isScope: false,
    scope: "" // []

  };

  if ((0, _utils.isType)(scope, "object")) {
    option = (0, _assign["default"])(option, scope);
    scope = option.scope;
  }

  scope = (0, _utils.isType)(scope, "string") ? [scope] : scope;
  var scopes = (0, _filter["default"])(apis, function (_ref3) {
    var key = _ref3[0];
    return (0, _includes["default"])(scope, key);
  });
  var isScope = (0, _utils.isType)((0, _values["default"])(IO)[0], "object");

  if (isScope && !option.isScope) {
    option.isScope = isScope;
  }

  var scopeIO = scopes.length ? getScope(scopes, IO, option.isScope) : getIsScope(apis, IO, option.isScope);
  return {
    scopeIO: scopeIO,
    option: option
  };
};

var connectHoc = function connectHoc(WrapperComponent, scope) {
  if (scope === void 0) {
    scope = [];
  }

  return (0, _react.forwardRef)(function (props, ref) {
    var _renderWrapper = function _renderWrapper(contextApis) {
      if (contextApis === void 0) {
        contextApis = {};
      }

      var IO = (0, _cloneDeep["default"])(contextApis);

      if ((0, _isEmpty["default"])(IO)) {
        console.warn("请在根组件挂载ProviderApi，并且注入apis");
      }

      var _getOption = getOption(scope, IO),
          scopeIO = _getOption.scopeIO,
          option = _getOption.option;

      var connectApis = (0, _reduce["default"])(scopeIO, function (pre, func, key) {
        if ((0, _utils.isType)(func, "object")) {
          var funcObj = {};
          (0, _forEach["default"])(func, function (value, key) {
            funcObj[key] = /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(params, cb) {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return getResult(value, params, cb, option.resultMode);

                      case 2:
                        return _context2.abrupt("return", _context2.sent);

                      case 3:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x5, _x6) {
                return _ref4.apply(this, arguments);
              };
            }();

            (0, _utils.extend)(funcObj[key], value);
          });
          return (pre[key] = funcObj) && pre;
        } else {
          pre[key] = /*#__PURE__*/function () {
            var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(params, cb) {
              return _regenerator["default"].wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return getResult(func, params, cb, option.resultMode);

                    case 2:
                      return _context3.abrupt("return", _context3.sent);

                    case 3:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            }));

            return function (_x7, _x8) {
              return _ref5.apply(this, arguments);
            };
          }();

          (0, _utils.extend)(pre[key], func);
          return pre;
        }
      }, {});

      for (var key in connectApis) {
        if (props[key]) {
          console.warn("@tongdun/tdhttp\uFF0CconnectApi\uFF0C\u8B66\u544A\uFF01\uFF01\uFF01\n          \u4F20\u5165\u7684props\u548Capis\u4E2D\u6709\u91CD\u540D\uFF0Cprops\u4E2D\u7684\u91CD\u540D\u53C2\u6570\u5C06\u88ABapis\u8986\u76D6\uFF0C\u91CD\u540D\u53C2\u6570\u4E3A\uFF1A" + key + ",\n          \u5728connectApi\u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4E3A\u5BF9\u8C61\uFF0C\u8BF7\u5728\u5176\u4E2D\u914D\u7F6E isScope: true\uFF0C(\u9009\u914Dscope: []/''\uFF0C\u4F7F\u7528combineApi\u4E2D\u7684\u53C2\u6570)");
        }
      }

      return /*#__PURE__*/_react["default"].createElement(WrapperComponent, (0, _extends3["default"])({
        ref: ref
      }, props, connectApis));
    };

    var Consumer = _context4["default"].Consumer;
    return /*#__PURE__*/_react["default"].createElement(Consumer, null, function (contextApis) {
      return _renderWrapper(contextApis);
    });
  });
};

var _default = function _default(WrapperComponent, scope) {
  // 支持装饰器写法
  if ((0, _utils.isType)(WrapperComponent, "function")) {
    return connectHoc(WrapperComponent, scope);
  } else {
    scope = scope || WrapperComponent || [];
    return function (WrapperComponent) {
      return connectHoc(WrapperComponent, scope);
    };
  }
};

exports["default"] = _default;