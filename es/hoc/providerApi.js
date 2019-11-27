import React, { useMemo } from "react";
import PropTypes from "prop-types";
import ReactContext from "./Context";

function ProviderApi(_ref) {
  var apis = _ref.apis,
      context = _ref.context,
      children = _ref.children;
  var contextValue = useMemo(function () {
    return apis;
  }, [apis]);
  var Context = context || ReactContext;
  var Provider = Context.Provider;
  return React.createElement(Provider, {
    value: contextValue
  }, children);
}

if (process.env.NODE_ENV !== "production") {
  ProviderApi.propTypes = {
    apis: PropTypes.object,
    context: PropTypes.object,
    children: PropTypes.any
  };
}

export default ProviderApi;