import React, { PureComponent } from 'react'
import { connectApi } from 'react-axios-http';
// 支持装饰器写法
// 1、@connectApi
// 2、@connectApi('apis_1')
// 3、@connectApi(Child，'apis_1')
class App extends PureComponent {

  getFetch = async () => {
    const { query } = this.props;
    const res = await query.getEventProgress();
    console.log(res);
  };

  render() {
    return (
      <div>
        <button onClick={this.getFetch}></button>
      </div>
    )
  }
}
// 只将query下的接口注入props中；
export default connectApi(App, 'query');
