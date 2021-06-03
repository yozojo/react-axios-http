import React, { forwardRef } from "react";
import values from "lodash/values";
import forEach from "lodash/forEach";
import isEmpty from "lodash/isEmpty";
import reduce from "lodash/reduce";
import assign from "lodash/assign";
import filter from "lodash/filter";
import includes from "lodash/includes";
import cloneDeep from "lodash/cloneDeep";
import { Global, awaitWrap, isType, extend } from "../utils";
import ReactContext from "./context";

const getResult = async (func, params, handler, resultMode) => {
  switch (resultMode) {
    case "native":
      return await func(params, handler);
    case "array":
      return await awaitWrap(func(params, handler));
    default:
      return await func(params, handler);
  }
};

const getScope = (arr, IO, isScope = false) => {
  try {
    const isDeep = isType(values(IO)[0], "object");

    const getDeep = (obj, IO) => {
      const cloneObj = {};
      forEach(obj, (value, key) => {
        cloneObj[key] = IO[key];
      });
      return cloneObj;
    };

    if (isEmpty(arr)) return IO;

    return reduce(
      arr,
      (pre, [key, obj]) => {
        const values = isDeep ? IO[key] : getDeep(obj, IO);
        return isScope ? { ...pre, [key]: values } : { ...pre, ...values };
      },
      {}
    );
  } catch (error) {
    console.error("tdhttp ==> connect: error ===> " + error);
    return IO;
  }
};

const getIsScope = (arr, IO, isScope = false) => {
  if (isScope) {
    return getScope(arr, IO, isScope);
  } else {
    return IO;
  }
};

const getOption = (scope, IO) => {
  const resultMode = Global._TDHTTP_RESULT_MODE;
  const apis = Global._TDHTTP_APIS || [];

  let option = {
    resultMode,
    isScope: false,
    scope: "", // []
  };

  if (isType(scope, "object")) {
    option = assign(option, scope);
    scope = option.scope;
  }

  scope = isType(scope, "string") ? [scope] : scope;

  const scopes = filter(apis, ([key]) => includes(scope, key));

  const isScope = isType(values(IO)[0], "object");

  if (isScope && !option.isScope) {
    option.isScope = isScope;
  }

  const scopeIO = scopes.length
    ? getScope(scopes, IO, option.isScope)
    : getIsScope(apis, IO, option.isScope);

  return {
    scopeIO,
    option,
  };
};

const connectHoc = (WrapperComponent, scope = []) => {
  return forwardRef((props, ref) => {
    const _renderWrapper = (contextApis = {}) => {
      const IO = cloneDeep(contextApis);

      if (isEmpty(IO)) {
        console.warn("请在根组件挂载ProviderApi，并且注入apis");
      }

      const { scopeIO, option } = getOption(scope, IO);

      const connectApis = reduce(
        scopeIO,
        (pre, func, key) => {
          if (isType(func, "object")) {
            const funcObj = {};
            forEach(func, (value, key) => {
              funcObj[key] = async (params, cb) =>
                await getResult(value, params, cb, option.resultMode);
              extend(funcObj[key], value);
            });

            return (pre[key] = funcObj) && pre;
          } else {
            pre[key] = async (params, cb) =>
              await getResult(func, params, cb, option.resultMode);
            extend(pre[key], func);

            return pre;
          }
        },
        {}
      );

      for (const key in connectApis) {
        if (props[key]) {
          console.warn(`@tongdun/tdhttp，connectApi，警告！！！
          传入的props和apis中有重名，props中的重名参数将被apis覆盖，重名参数为：${key},
          在connectApi的第二个参数为对象，请在其中配置 isScope: true，(选配scope: []/''，使用combineApi中的参数)`);
        }
      }

      return <WrapperComponent ref={ref} {...props} {...connectApis} />;
    };

    const { Consumer } = ReactContext;

    return <Consumer>{(contextApis) => _renderWrapper(contextApis)}</Consumer>;
  });
};

export default (WrapperComponent, scope) => {
  // 支持装饰器写法
  if (isType(WrapperComponent, "function")) {
    return connectHoc(WrapperComponent, scope);
  } else {
    scope = scope || WrapperComponent || [];
    return (WrapperComponent) => {
      return connectHoc(WrapperComponent, scope);
    };
  }
};
