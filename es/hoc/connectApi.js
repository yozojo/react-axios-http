import _extends from "@babel/runtime/helpers/esm/extends";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import React, { Component } from 'react';
import { awaitWrap, isType } from './utils';
export default (function (WrapperComponent, apis) {
  if (apis === void 0) {
    apis = [];
  }

  apis = isType(apis, 'string') ? [apis] : apis;
  return (
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(ConnectApi, _Component);

      function ConnectApi(props) {
        var _this;

        _this = _Component.call(this, props) || this;
        var IO = _this.context.apis || {};
        var curApis = apis.reduce(function (pre, cur) {
          pre[cur] = IO[cur];
          return pre;
        }, {});
        apis = apis.length ? curApis : IO;

        var handler = function handler(func, params, cb) {
          var result, _ref, err, res;

          return _regeneratorRuntime.async(function handler$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (cb === void 0) {
                    cb = function cb() {};
                  }

                  result = null;
                  cb = isType(params, 'function') ? params : cb;
                  params = isType(params, 'function') ? null : params;
                  _context.next = 6;
                  return _regeneratorRuntime.awrap(awaitWrap(func(params)));

                case 6:
                  _ref = _context.sent;
                  err = _ref[0];
                  res = _ref[1];

                  if (!err && res.success) {
                    result = res.attr || res.data;
                  } else {
                    console.error('请求失败！');
                  }

                  return _context.abrupt("return", cb(result) || result);

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          });
        };

        apis = Object.entries(apis).reduce(function (pre, _ref2) {
          var key = _ref2[0],
              func = _ref2[1];

          pre[key] = function _callee(params, cb) {
            return _regeneratorRuntime.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return _regeneratorRuntime.awrap(handler(func, params, cb));

                  case 2:
                    return _context2.abrupt("return", _context2.sent);

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          };

          return pre;
        }, {});
        _this.state = {
          apis: apis
        };
        return _this;
      }

      var _proto = ConnectApi.prototype;

      _proto.render = function render() {
        var apis = this.state.apis;
        return React.createElement(WrapperComponent, _extends({}, this.props, apis));
      };

      return ConnectApi;
    }(Component)
  );
});