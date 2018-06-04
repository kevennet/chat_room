import React, { Component, Fragment } from 'react';

import NavBar from 'antd-mobile/lib/nav-bar';
import 'antd-mobile/lib/nav-bar/style/css'

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar
          mode="dark"
          leftContent="Back"
          rightContent={[
            // <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            // <Icon key="1" type="ellipsis" />,
          ]}
        >客服</NavBar>
      </Fragment>
    );
  }
}

export default App;
