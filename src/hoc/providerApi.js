import React from 'react';
import PropTypes from 'prop-types';
import ReactContext from './Context';
import { Global } from '../utils';
import _ from 'lodash';

function ProviderApi({ apis, context, children }) {
  const contextValue = _.isArray(apis) ? apis : Global._TDHTTP_TRUE_APIS || [];

  const Context = context || ReactContext;

  const { Provider } = Context;

  return <Provider value={contextValue}>{children}</Provider>;
}

if (process.env.NODE_ENV !== 'production') {
  ProviderApi.propTypes = {
    apis: PropTypes.object,
    context: PropTypes.object,
    children: PropTypes.any,
  };
}

export default ProviderApi;
