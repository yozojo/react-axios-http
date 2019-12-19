import React, { useMemo } from 'react';
import { awaitWrap, isType } from './utils';
import ReactContext from './Context';

const Global = global || window;

const getResult = async (func, cb, params) => {
  const resultMode = Global._TDHTTP_RESULT_MODE;

  const nativeHandler = async () => {
    const res = await func(params);
    return cb(res) || res;
  };
  switch (resultMode) {
    case 'native':
      return await nativeHandler();
    case 'array':
      const [err, res] = await awaitWrap(func(params));
      return cb(err, res) || [err, res];
    default:
      return await nativeHandler();
  }
};

const handler = async (func, params, cb = () => {}) => {
  cb = isType(params, 'function') ? params : cb;
  params = isType(params, 'function') ? null : params;

  return await getResult(func, cb, params);
};

const getScope = (arr, IO) => {
  try {
    const isDeep = isType(Object.values(IO)[0], 'object');

    const getDeep = (obj, IO) => {
      const cloneObj = {};
      Object.keys(obj).forEach(key => {
        cloneObj[key] = IO[key];
      });
      return cloneObj;
    };

    return arr.reduce((pre, [key, obj]) => {
      const values = isDeep ? IO[key] : getDeep(obj, IO);
      return { ...pre, ...values };
    }, {});
  } catch (error) {
    console.error('tdhttp ==> connect: error ===> ' + error);
    return {};
  }
};

export default (WrapperComponent, scope = []) => {
  scope = isType(scope, 'string') ? [scope] : scope;
  const _TDHTTP_APIS = Global._TDHTTP_APIS || [];
  const scopeArr = _TDHTTP_APIS.filter(([key]) => scope.includes(key));

  const ConnectApi = ({ contextApis, ...otherPorps }) => {
    const connectApis = useMemo(() => {
      const IO = contextApis || {};

      const scopeIO = scopeArr.length ? getScope(scopeArr, IO) : IO;

      return Object.entries(scopeIO).reduce((pre, [key, func]) => {
        return (pre[key] = async (params, cb) => await handler(func, params, cb)) && pre;
      }, {});
    }, [contextApis]);

    return <WrapperComponent {...otherPorps} {...connectApis} />;
  };

  const { Consumer } = ReactContext;

  return props => (
    <Consumer>
      {contextApis => <ConnectApi contextApis={contextApis} {...props}></ConnectApi>}
    </Consumer>
  );
};
