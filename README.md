
## react-axios-http
  这是一款结合axios和react的封装请求库，
  主要解决了请求调用处理的统一和接口的统一管理，
  以及在项目中的接口便捷调用

### 使用方式

#### 初始化

```javascript
// ./http
import http, { combineApi } from "react-axios-http"

const apis = {
  // demo
  get: {
    // get 默认
    url: `/projectManage/show`,
  },
  post: {
    // post
    url: `/projectManage/show`,
    method: 'post',
    // isFormData: true 默认false
    // 是否需要以formData形式传参
    // isQuery: true 默认false
    // post请求下，是否以url Query方式 ?pageNum=1&pageSize=10
  },
  put: {
    // put
    url: `/projectManage/show`,
    method: 'put',
    // isFormData: true 默认false
    // 是否需要以formData形式传参
    // isQuery: true 默认false
    // put请求下，是否以url Query方式 ?pageNum=1&pageSize=10
  },
  delete: {
    // delete
    url: `/projectManage/show`,
    method: 'delete',
  },
  getJsonp: {
    // jsonp
    url: `/projectManage/show`,
    method: 'getJsonp',
  },
};

/* combineApi合并apis，作用域。
const IO = http(combineApi({
  apis_1: apis,
  apis_2: apis,
  apis_3: apis,
},
true/false 默认true，作用域开启
)); */

const IO = http(apis);

// const IO = http(apis, {
//   /* {opt} 默认可不传 */
//   // 高级模式下的数据返回结果处理方式
//   resultMode: 'native',// 可选array， 默认已设置native
//   host: '', // 接口统一host
//   prefix: '', // 接口统一前缀
// });

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

#### 项目中基本使用方式

```javascript
// 上面文件
import IO from './http'

const opt = {
  key1: 'value1',
  key2: 'value2',
}

const handler = (res) => {
  return Promise.resolve(res); // 推荐
  //return Promise.reject(res);
  // return res; 不推荐
}

// IO.getxxx(opt, handler)
// opt是传的参数，不需要传的可不写；
// handler 是对返回结果的二次加工，可不写；

IO.getxxx(opt, handler)
  .then(res => {
    // do something
  });

// 如无参数，直接对返回结果的二次加工
IO.getxxx(handler)
  .then(res => {
    // do something
  });

IO.getxxx().then(res => {
  // do something
});

```

### 基本使用说明

 * 默认get请求
 * 导出文件 import IO from './http'
 * 接口请求使用，直接IO.getxxx(),
 * getxxx为apis中一接口名
 * IO.getxxx(opt, handler)，()中get和post请求无参数可为(空)
 * handler 是对返回结果的二次加工，可不写；
 * opt 此参数为post和get请求参数,类型皆为对象，如
 * IO.getxxx({
 *   key: value,
 *   key: value,
 * }, handler)


#### 具体使用请参考 [example目录](./example/);

#### 高级使用方式
###### 模仿react-redux方式

```javascript

// 父组件或者根组件
import { ProviderApi } from "react-axios-http";
import apis from './http'
import Child from './Child'

ReactDOM.render(
    <ProviderApi apis={apis}>
        <Child />
    </ProviderApi>)
  document.getElementById("container")
);

//子组件

import React, { Component } from 'react'
import { connectApi } from "react-axios-http";

// 高级处理模式1 resultMode = 'native';默认
class Child extends Component {

  // 使用方式1
  getFetch = async () => {
    const { postxxx } = this.props;
    const res = await postxxx(/*对象参数*/, /* handler 二次加工函数，可不写 */);
    // 如无参数，直接对返回结果的二次加工
    // const res = await postxxx(/* handler 二次加工函数，可不写 */);
    //to do something
  }
  // 使用方式2
  getFetch = () => {
    const { postxxx } = this.props;
    postxxx(/*对象参数*/, /* handler 二次加工函数，可不写 */)
    // 如无参数，直接对返回结果的二次加工
    // postxxx(/* handler 二次加工函数，可不写 */)
    .then(res => {
      //to do something
    });
  }

  render() {
    return (
      <div onClick={this.getFetch}>
      </div>
    )
  }
}

// 高级处理模式2 resultMode = 'array，
// 返回一个数组，错误优先处理方式
class Child extends Component {

  // 使用方式1
  getFetch = async () => {
    const { postxxx } = this.props;
    const [err, res] = await postxxx(/*对象参数*/, /* handler 二次加工函数，可不写 */);
    // 如无参数，直接对返回结果的二次加工
    // const [err, res] = await postxxx(/* handler 二次加工函数，可不写 */);
    // err参数不为空则说明请求出现请求异常或者错误
    if (!err) {
      //to do something
    }
  }
  // 使用方式2
  getFetch = () => {
    const { postxxx } = this.props;
    postxxx(/*对象参数*/, /* handler 二次加工函数，可不写 */)
    .then(([err, res]) => {
      if (!err) {
        //to do something
      }
    });
  }

  render() {
    return (
      <div onClick={this.getFetch}>
      </div>
    )
  }
}

export default connectApi(Child);

```