import React, { PureComponent } from 'react'
import { connectApi } from 'react-axios-http';

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
