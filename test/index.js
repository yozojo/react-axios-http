/* 封装tdHttp拦截接口 */
// import http from '../lib/index';
const http = require('../lib/index');
const apis = {
  get: {
    url: 'localhost:9000/test'
  }
}

const IO = http(apis);

IO.interceptors.request.use(
  config => {
    console.log(config, 'interceptors request 1');
    return config;
  },
  error => Promise.reject(error),
);

IO.interceptors.request.use(
  config => {
    console.log(config, 'interceptors request 2');
    return config;
  },
  error => Promise.reject(error),
);

IO.interceptors.response.use(
  response => {
    return response;
  },
  error => Promise.reject(error),
);


IO.get()
.then(res => {
  console.log('res io', res)
})



