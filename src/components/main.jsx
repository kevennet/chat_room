import React, { Component, Fragment } from 'react'

import WingBlank from 'antd-mobile/lib/wing-blank'
import 'antd-mobile/lib/wing-blank/style/css'

class App extends Component {
  render() {
    return (
      <Fragment>
        <WingBlank>
          <div style={{textAlign: 'center', minHeight: '100vh'}}>test</div>
        </WingBlank>
      </Fragment>
    );
  }
}

export default App;
