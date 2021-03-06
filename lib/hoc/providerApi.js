"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _context = _interopRequireDefault(require("./context"));

function ProviderApi(_ref) {
  var apis = _ref.apis,
      context = _ref.context,
      children = _ref.children;
  var contextValue = (0, _react.useMemo)(function () {
    return apis;
  }, [apis]);
  var Context = context || _context["default"];
  var Provider = Context.Provider;
  return /*#__PURE__*/_react["default"].createElement(Provider, {
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