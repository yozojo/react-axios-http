import React, { PureComponent, createRef } from "react";
import { awaitWrap, isType } from "./utils";
import ReactContext from "./Context";

const Global = global || window;

const getResult = async (func, cb, params) => {
  const resultMode = Global._TDHTTP_RESULT_MODE;

  const nativeHandler = async () => {
    const res = await func(params);
    return cb(res) || res;
  };
  switch (resultMode) {
    case "native":
      return await nativeHandler();
    case "array":
      const [err, res] = await awaitWrap(func(params));
      return cb(err, res) || [err, res];
    default:
      return await nativeHandler();
  }
};

const handler = async (func, params, cb = () => {}) => {
  cb = isType(params, "function") ? params : cb;
  params = isType(params, "function") ? null : params;

  return await getResult(func, cb, params);
};

const getScope = (arr, IO, isScope = false) => {
  try {
    const isDeep = isType(Object.values(IO)[0], "object");

    const getDeep = (obj, IO) => {
      const cloneObj = {};
      Object.keys(obj).forEach(key => {
        cloneObj[key] = IO[key];
      });
      return cloneObj;
    };

    return arr.reduce((pre, [key, obj]) => {
      const values = isDeep ? IO[key] : getDeep(obj, IO);
      return isScope ? { ...pre, [key]: values } : { ...pre, ...values };
    }, {});
  } catch (error) {
    console.error("tdhttp ==> connect: error ===> " + error);
    return {};
  }
};

const getIsScope = (arr, IO, isScope = false) => {
  if (isScope) {
    return getScope(arr, IO, isScope);
  } else {
    return IO;
  }
};

export default (WrapperComponent, scope = []) => {
  let option = {
    // scope: [],
    scope: "",
    isScope: false
  };
  if (isType(scope, "object")) {
    option = Object.assign(option, scope);
    scope = option.scope;
  }

  scope = isType(scope, "string") ? [scope] : scope;

  const apis = Global._TDHTTP_APIS || [];
  const scopeArr = apis.filter(([key]) => scope.includes(key));

  return class ConnectApi extends PureComponent {
    constructor(props) {
      super(props);
      this.Intance = createRef();
    }

    getInstance() {
      return this.Intance && this.Intance.current;
    }

    renderWrapper(contextApis) {
      const IO = contextApis || {};

      const scopeIO = scopeArr.length
        ? getScope(scopeArr, IO, option.isScope)
        : getIsScope(apis, IO, option.isScope);

      const connectApis = Object.entries(scopeIO).reduce((pre, [key, func]) => {
        if (isType(func, "object")) {
          const funcObj = {};
          for (const fkey in func) {
            if (func.hasOwnProperty(fkey)) {
              funcObj[fkey] = async (params, cb) =>
                await handler(func[fkey], params, cb);
            }
          }

          return (pre[key] = funcObj) && pre;
        } else {
          return (
            (pre[key] = async (params, cb) =>
              await handler(func, params, cb)) && pre
          );
        }
      }, {});

      for (const key in connectApis) {
        if (this.props[key]) {
          console.warn(`@tongdun/tdhttp，connectApi，警告！！！
          传入的props和apis中有重名，props中的重名参数将被apis覆盖，重名参数为：${key},
          在connectApi的第二个参数为对象，请在其中配置 isScope: true，(选配scope: []/''，使用combineApi中的参数)`);
        }
      }

      return (
        <WrapperComponent
          ref={this.Intance}
          {...this.props}
          {...connectApis}
        />
      );
    }

    render() {
      const { Consumer } = ReactContext;

      return (
        <Consumer>{contextApis => this.renderWrapper(contextApis)}</Consumer>
      );
    }
  };
};
