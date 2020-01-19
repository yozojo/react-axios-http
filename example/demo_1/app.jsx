import React, { PureComponent } from 'react'
import { connectApi } from 'react-axios-http';

// 支持装饰器写法
// 1、@connectApi
// 2、@connectApi('apis_1')
// 3、@connectApi(Child，'apis_1')
class App extends PureComponent {

  // 使用方式1
  getFetch = async () => {
    const { query } = this.props;
    const res = await query.getEventProgress({
      pageNum: 1,
      pageSize: 10
    }/*对象参数*/, /* handler 二次加工函数，可不写 */);
    // 若无参数，直接对返回结果的二次加工
    // const res = await query.getEventProgress(/* handler 二次加工函数，可不写 */);
    //to do something
  }
  // 使用方式2
  getFetch = () => {
    const { query } = this.props;
    query.getEventProgress({
      pageNum: 1,
      pageSize: 10
    }/*对象参数*/, /* handler 二次加工函数，可不写 */)
    // 若无参数，直接对返回结果的二次加工
    // query.getEventProgress(/* handler 二次加工函数，可不写 */)
    .then(res => {
      //to do something
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.getFetch}></button>
      </div>
    )
  }
}
// 只将目录下http中apis中的query模块的接口注入props中；
export default connectApi(App);
