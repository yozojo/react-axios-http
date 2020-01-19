/* 封装tdHttp拦截接口 */
import apis from "./apis";
import http from "react-axios-http";

const IO = http(apis, {
  resultMode: 'array'
  // 与demo_1 差异，此配置会在connectApi包裹的接口响应中返回一个数组；具体参考demo_2
});

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
