import React, { PureComponent, Fragment } from 'react';

import NavBar from 'antd-mobile/lib/nav-bar';
import 'antd-mobile/lib/nav-bar/style/css'

class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <NavBar
          mode="dark"
          leftContent="Back"
        >客服</NavBar>
      </Fragment>
    );
  }
}

export default App;
