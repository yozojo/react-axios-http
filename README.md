
## react-axios-http
  这是一款结合axios和react的封装请求库

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
  }
  post: {
    // post
    url: `/projectManage/show`,
    method: 'post',
    // isFormData: true 默认false
    // 是否需要以formData形式传参
    // isQuery: true 默认false
    // 是否以url Query方式 ?pageNum=1&pageSize=10
  },
  put: {
    // put
    url: `/projectManage/show`,
    method: 'put',
    // isFormData: true 默认false
    // 是否需要以formData形式传参
    // isQuery: true 默认false
    // 是否以url Query方式 ?pageNum=1&pageSize=10
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

IO.getxxx({
    // ...opt
  }).then(res => {
    // do something
  });

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
    const res = await postxxx(/*对象参数*/);
    //to do something
  }
  // 使用方式2
  getFetch = () => {
    const { postxxx } = this.props;
    postxxx(/*对象参数*/)
    .then(res => {
      //to do something
    });
  }
  // 使用方式3
  getFetch = () => {
    const { postxxx } = this.props;
    postxxx(/*对象参数*/, res => {
      //to do something
    })
  }
  // 使用方式4
  getFetch = () => {
    const { postxxx } = this.props;
    // 无参数时可直接放置函数
    postxxx(res => {
      //to do something
    })
  }
  render() {
    return (
      <div onClick={this.getFetch}>
      </div>
    )
  }
}

// 高级处理模式2 resultMode = 'array';
class Child extends Component {

  // 使用方式1
  getFetch = async () => {
    const { postxxx } = this.props;
    const [err, res] = await postxxx(/*对象参数*/);
    // err参数不为空则说明请求出现请求异常或者错误
    if (!err) {
      //to do something
    }
  }
  // 使用方式2
  getFetch = () => {
    const { postxxx } = this.props;
    postxxx(/*对象参数*/)
    .then(([err, res]) => {
      if (!err) {
        //to do something
      }
    });
  }
  // 使用方式3
  getFetch = () => {
    const { postxxx } = this.props;
    postxxx(/*对象参数*/, (err, res) => {
      if (!err) {
        //to do something
      }
    })
  }
  // 使用方式4
  getFetch = () => {
    const { postxxx } = this.props;
    // 无参数时可直接放置函数
    postxxx((err, res) => {
      if (!err) {
        //to do something
      }
    })
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


