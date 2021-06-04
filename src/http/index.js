/* 封装tdHttp拦截接口 */
import createHttpInstance from "./http";
import { Global, setOpt, extend, isType } from "../utils";
import forEach from "lodash/forEach";
import assign from "lodash/assign";

Global._TDHTTP_RESULT_MODE = "native";

const http = (apis = {}, opt = {}) => {
  const tdHttp = createHttpInstance();

  const defaultOpt = {
    resultMode: "native",
    prefix: "",
  };

  const IO = {};

  const { resultMode, ...others } = assign(defaultOpt, opt);
  Global._TDHTTP_RESULT_MODE = resultMode;

  extend(IO, tdHttp);
  forEach(apis, (api, key) => {
    IO[key] = apiFactory(api, others, tdHttp);
  });

  defineProperty(IO, ["interceptors", "_request"]);

  return IO;
};

const setApi = (api, props, tdHttp) => {
  const { prefix, ...others } = props;

  function getData(opt, handler) {
    if (isType(opt, "function")) {
      handler = opt;
      opt = {};
    }
    opt = setOpt({ ...api, opt });

    const url = isType(api.url, "function")
      ? api.url({ ...opt, ...props })
      : prefix + api.url;

    if (!isType(url, "string")) {
      throw new Error("url如果是函数传入请执行后return string类型");
    }

    const config = {
      ...others,
      ...api,
      url,
    };

    return tdHttp(
      {
        ...config,
        ...opt,
        url,
      },
      handler
    );
  }

  return getData;
};

const apiFactory = (api, opt, tdHttp) => {
  if (isType(api, "object") && !api.url) {
    forEach(api, (obj, key) => {
      api[key] = setApi(obj, opt, tdHttp);
    });
    return api;
  }

  return setApi(api, opt, tdHttp);
};

const defineProperty = (target, props = []) => {
  forEach(props, (prop) => {
    Object.defineProperty(target, prop, {
      writable: true,
      enumerable: false,
      configurable: false,
    });
  });
};

export default http;
