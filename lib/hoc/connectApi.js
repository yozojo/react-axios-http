"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../utils");

var _Context = _interopRequireDefault(require("./Context"));

var Global = global || window;

var getResult = function getResult(func, params, handler, resultMode) {
  return _regenerator["default"].async(function getResult$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = resultMode;
          _context.next = _context.t0 === 'native' ? 3 : _context.t0 === 'array' ? 6 : 9;
          break;

        case 3:
          _context.next = 5;
          return _regenerator["default"].awrap(func(params, handler));

        case 5:
          return _context.abrupt("return", _context.sent);

        case 6:
          _context.next = 8;
          return _regenerator["default"].awrap((0, _utils.awaitWrap)(func(params, handler)));

        case 8:
          return _context.abrupt("return", _context.sent);

        case 9:
          _context.next = 11;
          return _regenerator["default"].awrap(func(params, handler));

        case 11:
          return _context.abrupt("return", _context.sent);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getScope = function getScope(arr, IO, isScope) {
  if (isScope === void 0) {
    isScope = false;
  }

  try {
    var isDeep = (0, _utils.isType)(_lodash["default"].values(IO)[0], 'object');

    var getDeep = function getDeep(obj, IO) {
      var cloneObj = {};

      _lodash["default"].forEach(obj, function (value, key) {
        cloneObj[key] = IO[key];
      });

      return cloneObj;
    };

    if (_lodash["default"].isEmpty(arr)) return IO;
    return _lodash["default"].reduce(arr, function (pre, _ref) {
      var _extends2;

      var key = _ref[0],
          obj = _ref[1];
      var values = isDeep ? IO[key] : getDeep(obj, IO);
      return isScope ? (0, _extends3["default"])({}, pre, (_extends2 = {}, _extends2[key] = values, _extends2)) : (0, _extends3["default"])({}, pre, {}, values);
    }, {});
  } catch (error) {
    console.error('tdhttp ==> connect: error ===> ' + error);
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
  var resultMode = Global._TDHTTP_RESULT_MODE;
  var apis = Global._TDHTTP_APIS || [];
  var option = {
    resultMode: resultMode,
    isScope: false,
    scope: '' // []

  };

  if ((0, _utils.isType)(scope, 'object')) {
    option = _lodash["default"].assign(option, scope);
    scope = option.scope;
  }

  scope = (0, _utils.isType)(scope, 'string') ? [scope] : scope;

  var scopes = _lodash["default"].filter(apis, function (_ref2) {
    var key = _ref2[0];
    return _lodash["default"].includes(scope, key);
  });

  var isScope = (0, _utils.isType)(_lodash["default"].values(IO)[0], 'object');

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

  return (
    /*#__PURE__*/
    function (_PureComponent) {
      (0, _inheritsLoose2["default"])(ConnectApi, _PureComponent);

      function ConnectApi(props) {
        var _this;

        _this = _PureComponent.call(this, props) || this;
        _this._Instance = (0, _react.createRef)();
        return _this;
      }

      var _proto = ConnectApi.prototype;

      _proto.getInstance = function getInstance() {
        // 获得connectApi包裹的组件实例
        return this._Instance && this._Instance.current;
      };

      _proto._renderWrapper = function _renderWrapper(contextApis) {
        if (contextApis === void 0) {
          contextApis = {};
        }

        var IO = _lodash["default"].cloneDeep(contextApis);

        if (_lodash["default"].isEmpty(IO)) {
          console.warn('请在根组件挂载ProviderApi，并且注入apis');
        }

        var _getOption = getOption(scope, IO),
            scopeIO = _getOption.scopeIO,
            option = _getOption.option;

        var connectApis = _lodash["default"].reduce(scopeIO, function (pre, func, key) {
          if ((0, _utils.isType)(func, 'object')) {
            var funcObj = {};

            _lodash["default"].forEach(func, function (value, key) {
              funcObj[key] = function _callee(params, cb) {
                return _regenerator["default"].async(function _callee$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _regenerator["default"].awrap(getResult(value, params, cb, option.resultMode));

                      case 2:
                        return _context2.abrupt("return", _context2.sent);

                      case 3:
                      case "end":
                        return _context2.stop();
                    }
                  }
                });
              };
            });

            return (pre[key] = funcObj) && pre;
          } else {
            return (pre[key] = function _callee2(params, cb) {
              return _regenerator["default"].async(function _callee2$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return _regenerator["default"].awrap(getResult(func, params, cb, option.resultMode));

                    case 2:
                      return _context3.abrupt("return", _context3.sent);

                    case 3:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            }) && pre;
          }
        }, {});

        for (var key in connectApis) {
          if (this.props[key]) {
            console.warn("react-axios-http\uFF0CconnectApi\uFF0C\u8B66\u544A\uFF01\uFF01\uFF01\n          \u4F20\u5165\u7684props\u548Capis\u4E2D\u6709\u91CD\u540D\uFF0Cprops\u4E2D\u7684\u91CD\u540D\u53C2\u6570\u5C06\u88ABapis\u8986\u76D6\uFF0C\u91CD\u540D\u53C2\u6570\u4E3A\uFF1A" + key + ",\n          \u5728connectApi\u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4E3A\u5BF9\u8C61\uFF0C\u8BF7\u5728\u5176\u4E2D\u914D\u7F6E isScope: true\uFF0C(\u9009\u914Dscope: []/''\uFF0C\u4F7F\u7528combineApi\u4E2D\u7684\u53C2\u6570)");
          }
        }

        return _react["default"].createElement(WrapperComponent, (0, _extends3["default"])({
          ref: this._Instance
        }, this.props, connectApis));
      };

      _proto.render = function render() {
        var _this2 = this;

        var Consumer = _Context["default"].Consumer;
        return _react["default"].createElement(Consumer, null, function (contextApis) {
          return _this2._renderWrapper(contextApis);
        });
      };

      return ConnectApi;
    }(_react.PureComponent)
  );
};

var _default = function _default(WrapperComponent, scope) {
  // 支持装饰器写法
  if ((0, _utils.isType)(WrapperComponent, 'function')) {
    return connectHoc(WrapperComponent, scope = []);
  } else {
    scope = scope || WrapperComponent || [];
    return function (WrapperComponent) {
      return connectHoc(WrapperComponent, scope);
    };
  }
};

exports["default"] = _default;