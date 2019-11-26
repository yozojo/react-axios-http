

### 使用方式

#### 初始化

```javascript

const http = require('@tongdun/tdhttp');

const apis = {
  // demo
  postxxx: {
    // post
    url: `/projectManage/show`,
    method: 'post',
  },
  getxxx: {
    // get
    url: `/scriptManage/clientIp`,

};
const IO = http(apis);

IO.interceptors.request.use(
  config => {
    console.log(config, 'interceptors request');
    return config;
  },
  error => Promise.reject(error),
);

IO.interceptors.response.use(
  response => {
    console.log(response, 'interceptors response');
    return response;
  },
  error => Promise.reject(error),
);

export default IO;

```

#### 项目中调用数据

```javascript
import IO from './http'

IO.getxxx({
    // ...opt
    id: 1 ,
    isValid: 2,
  }).then(
    res => {
      // do something
    },
    () => {
      // do something
    },
  );
```

### 说明

/**
 * 默认get请求
 * 导出文件 import IO from './http'
 * 接口请求使用，直接IO.getxxx(),
 * getxxx为apis中一接口名
 * IO.getxxx(opt)，()中get和post请求无参数可为(空)
 * opt 此参数为post和get请求参数,类型皆为对象，如
 * IO.getxxx({
 *   key: value,
 *   key: value,
 * })
 */
