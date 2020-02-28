"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Context = _interopRequireDefault(require("./Context"));

var _utils = require("../utils");

var _lodash = _interopRequireDefault(require("lodash"));

function ProviderApi(_ref) {
  var apis = _ref.apis,
      context = _ref.context,
      children = _ref.children;
  var contextValue = _lodash["default"].isArray(apis) ? apis : _utils.Global._TDHTTP_TRUE_APIS || [];
  var Context = context || _Context["default"];
  var Provider = Context.Provider;
  return _react["default"].createElement(Provider, {
    value: contextValue
  }, children);
}

if (process.env.NODE_ENV !== 'production') {
  ProviderApi.propTypes = {
    apis: _propTypes["default"].object,
    context: _propTypes["default"].object,
    children: _propTypes["default"].any
  };
}

var _default = ProviderApi;
exports["default"] = _default;