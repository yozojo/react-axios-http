import React, { PureComponent } from 'react'
import { connectApi } from 'react-axios-http';

class App extends PureComponent {

  getFetch = async () => { // 1
    const res = await this.props.getEventProgress();
    console.log(res);
  };

  // getFetch = async () => { // 2
  //   const { query } = this.props;
  //   const res = await query.getEventProgress();
  //   console.log(res);
  // };

  render() {
    return (
      <div>
        <button onClick={this.getFetch}></button>
      </div>
    )
  }
}
// 1
// 只将query下的接口注入props中
export default connectApi(App, 'query');

// 2
// 如果还想得到demo_2的效果，需要如下配置 2
// export default connectApi(App, {
//   scope: "query",
//   isScope: true
// });
