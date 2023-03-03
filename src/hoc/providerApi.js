import React, { useMemo } from 'react';
import ReactContext from './context';

function ProviderApi({ apis, context, children }) {
  const contextValue = useMemo(() => apis, [apis]);

  const Context = context || ReactContext;

  const { Provider } = Context;

  return <Provider value={contextValue}>{children}</Provider>;
}

export default ProviderApi;
