import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import React, { PureComponent, createRef } from "react";
import { awaitWrap, isType } from "./utils";
import ReactContext from "./Context";
var Global = global || window;

var getResult = function getResult(func, cb, params) {
  var resultMode, nativeHandler, _ref, err, res;

  return _regeneratorRuntime.async(function getResult$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          resultMode = Global._TDHTTP_RESULT_MODE;

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
          _context2.next = _context2.t0 === "native" ? 5 : _context2.t0 === "array" ? 8 : 14;
          break;

        case 5:
          _context2.next = 7;
          return _regeneratorRuntime.awrap(nativeHandler());

        case 7:
          return _context2.abrupt("return", _context2.sent);

        case 8:
          _context2.next = 10;
          return _regeneratorRuntime.awrap(awaitWrap(func(params)));

        case 10:
          _ref = _context2.sent;
          err = _ref[0];
          res = _ref[1];
          return _context2.abrupt("return", cb(err, res) || [err, res]);

        case 14:
          _context2.next = 16;
          return _regeneratorRuntime.awrap(nativeHandler());

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

var getScope = function getScope(arr, IO, isScope) {
  if (isScope === void 0) {
    isScope = false;
  }

  try {
    var isDeep = isType(Object.values(IO)[0], "object");

    var getDeep = function getDeep(obj, IO) {
      var cloneObj = {};
      Object.keys(obj).forEach(function (key) {
        cloneObj[key] = IO[key];
      });
      return cloneObj;
    };

    return arr.reduce(function (pre, _ref2) {
      var _extends2;

      var key = _ref2[0],
          obj = _ref2[1];
      var values = isDeep ? IO[key] : getDeep(obj, IO);
      return isScope ? _extends({}, pre, (_extends2 = {}, _extends2[key] = values, _extends2)) : _extends({}, pre, {}, values);
    }, {});
  } catch (error) {
    console.error("tdhttp ==> connect: error ===> " + error);
    return {};
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

export default (function (WrapperComponent, scope) {
  if (scope === void 0) {
    scope = [];
  }

  var option = {
    // scope: [],
    scope: "",
    isScope: false
  };

  if (isType(scope, "object")) {
    option = Object.assign(option, scope);
    scope = option.scope;
  }

  scope = isType(scope, "string") ? [scope] : scope;
  var apis = Global._TDHTTP_APIS || [];
  var scopeArr = apis.filter(function (_ref3) {
    var key = _ref3[0];
    return scope.includes(key);
  });
  return (
    /*#__PURE__*/
    function (_PureComponent) {
      _inheritsLoose(ConnectApi, _PureComponent);

      function ConnectApi(props) {
        var _this;

        _this = _PureComponent.call(this, props) || this;
        _this.Intance = createRef();
        return _this;
      }

      var _proto = ConnectApi.prototype;

      _proto.getInstance = function getInstance() {
        return this.Intance && this.Intance.current;
      };

      _proto.renderWrapper = function renderWrapper(contextApis) {
        var IO = contextApis || {};
        var scopeIO = scopeArr.length ? getScope(scopeArr, IO, option.isScope) : getIsScope(apis, IO, option.isScope);
        var connectApis = Object.entries(scopeIO).reduce(function (pre, _ref4) {
          var key = _ref4[0],
              func = _ref4[1];

          if (isType(func, "object")) {
            var funcObj = {};

            var _loop = function _loop(fkey) {
              if (func.hasOwnProperty(fkey)) {
                funcObj[fkey] = function _callee(params, cb) {
                  return _regeneratorRuntime.async(function _callee$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return _regeneratorRuntime.awrap(handler(func[fkey], params, cb));

                        case 2:
                          return _context4.abrupt("return", _context4.sent);

                        case 3:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  });
                };
              }
            };

            for (var fkey in func) {
              _loop(fkey);
            }

            return (pre[key] = funcObj) && pre;
          } else {
            return (pre[key] = function _callee2(params, cb) {
              return _regeneratorRuntime.async(function _callee2$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return _regeneratorRuntime.awrap(handler(func, params, cb));

                    case 2:
                      return _context5.abrupt("return", _context5.sent);

                    case 3:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            }) && pre;
          }
        }, {});

        for (var key in connectApis) {
          if (this.props[key]) {
            console.warn("@tongdun/tdhttp\uFF0CconnectApi\uFF0C\u8B66\u544A\uFF01\uFF01\uFF01\n          \u4F20\u5165\u7684props\u548Capis\u4E2D\u6709\u91CD\u540D\uFF0Cprops\u4E2D\u7684\u91CD\u540D\u53C2\u6570\u5C06\u88ABapis\u8986\u76D6\uFF0C\u91CD\u540D\u53C2\u6570\u4E3A\uFF1A" + key + ",\n          \u5728connectApi\u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4E3A\u5BF9\u8C61\uFF0C\u8BF7\u5728\u5176\u4E2D\u914D\u7F6E isScope: true\uFF0C(\u9009\u914Dscope: []/''\uFF0C\u4F7F\u7528combineApi\u4E2D\u7684\u53C2\u6570)");
          }
        }

        return React.createElement(WrapperComponent, _extends({
          ref: this.Intance
        }, this.props, connectApis));
      };

      _proto.render = function render() {
        var _this2 = this;

        var Consumer = ReactContext.Consumer;
        return React.createElement(Consumer, null, function (contextApis) {
          return _this2.renderWrapper(contextApis);
        });
      };

      return ConnectApi;
    }(PureComponent)
  );
});