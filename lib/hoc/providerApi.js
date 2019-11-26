"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var ProviderApi =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ProviderApi, _Component);
  var _proto = ProviderApi.prototype;

  _proto.getChildContext = function getChildContext() {
    return {
      apis: this.props.apis
    };
  };

  function ProviderApi() {
    return _Component.call(this) || this;
  }

  _proto.render = function render() {
    return this.props.children;
  };

  return ProviderApi;
}(_react.Component);

exports["default"] = ProviderApi;
ProviderApi.childContextTypes = {
  apis: _propTypes.PropTypes.object
};