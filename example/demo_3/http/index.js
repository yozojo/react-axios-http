/* 封装tdHttp拦截接口 */
import apis from "./apis";
import http from "react-axios-http";

const IO = http(apis);

IO.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

IO.interceptors.response.use(
  response => {
    // do something
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default IO;
