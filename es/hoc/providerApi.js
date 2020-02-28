import React from 'react';
import PropTypes from 'prop-types';
import ReactContext from './Context';
import { Global } from '../utils';
import _ from 'lodash';

function ProviderApi(_ref) {
  var apis = _ref.apis,
      context = _ref.context,
      children = _ref.children;
  var contextValue = _.isArray(apis) ? apis : Global._TDHTTP_TRUE_APIS || [];
  var Context = context || ReactContext;
  var Provider = Context.Provider;
  return React.createElement(Provider, {
    value: contextValue
  }, children);
}

if (process.env.NODE_ENV !== 'production') {
  ProviderApi.propTypes = {
    apis: PropTypes.object,
    context: PropTypes.object,
    children: PropTypes.any
  };
}

export default ProviderApi;