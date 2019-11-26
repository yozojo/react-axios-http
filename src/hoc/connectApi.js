import React, { Component } from 'react';
import { awaitWrap, isType } from './utils';

export default (WrapperComponent, apis = []) => {
  apis = isType(apis, 'string') ? [apis] : apis;

  return class ConnectApi extends Component {
    constructor(props) {
      super(props);

      const IO = this.context.apis || {};

      const curApis = apis.reduce((pre, cur) => {
        pre[cur] = IO[cur];
        return pre;
      }, {});

      apis = apis.length ? curApis : IO;

      const handler = async (func, params, cb = () => {}) => {
        let result = null;
        cb = isType(params, 'function') ? params : cb;
        params = isType(params, 'function') ? null : params;

        const [err, res] = await awaitWrap(func(params));
        if (!err && res.success) {
          result = res.attr || res.data;
        } else {
          console.error('请求失败！');
        }
        return cb(result) || result;
      };

      apis = Object.entries(apis).reduce((pre, [key, func]) => {
        pre[key] = async (params, cb) => await handler(func, params, cb);
        return pre;
      }, {});

      this.state = { apis };
    }

    render() {
      const { apis } = this.state;

      return <WrapperComponent {...this.props} {...apis} />;
    }
  };
};
