"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

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

var _default = ProviderApi;
exports["default"] = _default;