import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

var ProviderApi =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ProviderApi, _Component);

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
}(Component);

export { ProviderApi as default };
ProviderApi.childContextTypes = {
  apis: PropTypes.object
};