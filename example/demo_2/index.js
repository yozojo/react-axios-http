import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { ProviderApi } from 'react-axios-http';
import apis from './http';

import App from './app';
import './index.less';

ReactDOM.render(
  <AppContainer>
    <ProviderApi apis={apis}>
        <App/>
    </ProviderApi>
  </AppContainer>,
  document.getElementById('container'),
);
