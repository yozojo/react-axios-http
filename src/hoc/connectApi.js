import React, { useMemo } from "react";
import { awaitWrap, isType } from "./utils";
import ReactContext from "./Context";

export default (WrapperComponent, apis = []) => {
  apis = isType(apis, "string") ? [apis] : apis;
  const resultMode = window._TDHTTP_RESULT_MODE;

  const getResult = async (func, cb, params) => {
    const nativeHandler = async () => {
      const res = await func(params);
      return cb(res) || res;
    };
    switch (resultMode) {
      case "native":
        return await nativeHandler();
        break;
      case "array":
        const [err, res] = await awaitWrap(func(params));
        return cb(err, res) || [err, res];
        break;
      default:
        return await nativeHandler();
        break;
    }
  };

  const handler = async (func, params, cb = () => {}) => {
    cb = isType(params, "function") ? params : cb;
    params = isType(params, "function") ? null : params;

    return await getResult(func, cb, params);
  };

  const ConnectApi = ({ contextApis, ...otherPorps }) => {
    const connectApis = useMemo(() => {
      const IO = contextApis || {};

      const curApis = apis.reduce((pre, cur) => {
        return (pre[cur] = IO[cur]) && pre;
      }, {});

      let apisObj = apis.length ? curApis : IO;

      apisObj = Object.entries(apisObj).reduce((pre, [key, func]) => {
        return (pre[key] = async (params, cb) => await handler(func, params, cb)) && pre;
      }, {});

      return apisObj;
    }, [contextApis]);

    return <WrapperComponent {...otherPorps} {...connectApis} />;
  };

  const { Consumer } = ReactContext;

  return props => (
    <Consumer>
      {contextApis => (
        <ConnectApi contextApis={contextApis} {...props}></ConnectApi>
      )}
    </Consumer>
  );
};
