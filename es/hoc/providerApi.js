import React, { useMemo } from 'react';
import ReactContext from './context';

function ProviderApi(_ref) {
  var apis = _ref.apis,
      context = _ref.context,
      children = _ref.children;
  var contextValue = useMemo(function () {
    return apis;
  }, [apis]);
  var Context = context || ReactContext;
  var Provider = Context.Provider;
  return /*#__PURE__*/React.createElement(Provider, {
    value: contextValue
  }, children);
}

export default ProviderApi;