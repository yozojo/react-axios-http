import React, { useMemo } from "react";
import PropTypes from "prop-types";
import ReactContext from "./Context";

function ProviderApi({ apis, context, children }) {
  const contextValue = useMemo(() => apis, [apis]);

  const Context = context || ReactContext;

  const { Provider } = Context;

  return <Provider value={contextValue}>{children}</Provider>;
}

if (process.env.NODE_ENV !== "production") {
  ProviderApi.propTypes = {
    apis: PropTypes.object,
    context: PropTypes.object,
    children: PropTypes.any
  };
}

export default ProviderApi;
