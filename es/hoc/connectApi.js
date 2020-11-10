import _extends from "@babel/runtime/helpers/esm/extends";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import React, { forwardRef } from 'react';
import _ from 'lodash';
import { Global, awaitWrap, isType, extend } from '../utils';
import ReactContext from './context';

var getResult = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(func, params, handler, resultMode) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = resultMode;
            _context.next = _context.t0 === 'native' ? 3 : _context.t0 === 'array' ? 6 : 9;
            break;

          case 3:
            _context.next = 5;
            return func(params, handler);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
            _context.next = 8;
            return awaitWrap(func(params, handler));

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
    var isDeep = isType(_.values(IO)[0], 'object');

    var getDeep = function getDeep(obj, IO) {
      var cloneObj = {};

      _.forEach(obj, function (value, key) {
        cloneObj[key] = IO[key];
      });

      return cloneObj;
    };

    if (_.isEmpty(arr)) return IO;
    return _.reduce(arr, function (pre, _ref2) {
      var _extends2;

      var key = _ref2[0],
          obj = _ref2[1];
      var values = isDeep ? IO[key] : getDeep(obj, IO);
      return isScope ? _extends({}, pre, (_extends2 = {}, _extends2[key] = values, _extends2)) : _extends({}, pre, values);
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

  if (isType(scope, 'object')) {
    option = _.assign(option, scope);
    scope = option.scope;
  }

  scope = isType(scope, 'string') ? [scope] : scope;

  var scopes = _.filter(apis, function (_ref3) {
    var key = _ref3[0];
    return _.includes(scope, key);
  });

  var isScope = isType(_.values(IO)[0], 'object');

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

  return forwardRef(function (props, ref) {
    var _renderWrapper = function _renderWrapper(contextApis) {
      if (contextApis === void 0) {
        contextApis = {};
      }

      var IO = _.cloneDeep(contextApis);

      if (_.isEmpty(IO)) {
        console.warn('请在根组件挂载ProviderApi，并且注入apis');
      }

      var _getOption = getOption(scope, IO),
          scopeIO = _getOption.scopeIO,
          option = _getOption.option;

      var connectApis = _.reduce(scopeIO, function (pre, func, key) {
        if (isType(func, 'object')) {
          var funcObj = {};

          _.forEach(func, function (value, key) {
            funcObj[key] = /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(params, cb) {
                return _regeneratorRuntime.wrap(function _callee2$(_context2) {
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

            extend(funcObj[key], value);
          });

          return (pre[key] = funcObj) && pre;
        } else {
          pre[key] = /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(params, cb) {
              return _regeneratorRuntime.wrap(function _callee3$(_context3) {
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

          extend(pre[key], func);
          return pre;
        }
      }, {});

      for (var key in connectApis) {
        if (props[key]) {
          console.warn("@tongdun/tdhttp\uFF0CconnectApi\uFF0C\u8B66\u544A\uFF01\uFF01\uFF01\n          \u4F20\u5165\u7684props\u548Capis\u4E2D\u6709\u91CD\u540D\uFF0Cprops\u4E2D\u7684\u91CD\u540D\u53C2\u6570\u5C06\u88ABapis\u8986\u76D6\uFF0C\u91CD\u540D\u53C2\u6570\u4E3A\uFF1A" + key + ",\n          \u5728connectApi\u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4E3A\u5BF9\u8C61\uFF0C\u8BF7\u5728\u5176\u4E2D\u914D\u7F6E isScope: true\uFF0C(\u9009\u914Dscope: []/''\uFF0C\u4F7F\u7528combineApi\u4E2D\u7684\u53C2\u6570)");
        }
      }

      return /*#__PURE__*/React.createElement(WrapperComponent, _extends({
        ref: ref
      }, props, connectApis));
    };

    var Consumer = ReactContext.Consumer;
    return /*#__PURE__*/React.createElement(Consumer, null, function (contextApis) {
      return _renderWrapper(contextApis);
    });
  });
};

export default (function (WrapperComponent, scope) {
  // 支持装饰器写法
  if (isType(WrapperComponent, 'function')) {
    return connectHoc(WrapperComponent, scope);
  } else {
    scope = scope || WrapperComponent || [];
    return function (WrapperComponent) {
      return connectHoc(WrapperComponent, scope);
    };
  }
});