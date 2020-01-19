import React, { PureComponent } from 'react'
import IO from './http';

// 简单使用方式

class App extends PureComponent {

  getFetch = async () => {
    const res = await IO.query.getEventProgress({
      pageNum: 1,
      pageSize: 10
    });
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

export default App;
