import * as React from 'react'

import { hot } from 'react-hot-loader'

import Icon from "antd-mobile/lib/icon"
import "antd-mobile/lib/icon/style/css"

const list = ['check', 'check-circle', 'check-circle-o', 'cross', 'cross-circle', 'cross-circle-o', 'left', 'right', 'down', 'up', 'loading', 'search', 'ellipsis', 'ellipsis-circle', 'exclamation-circle', 'info-circle', 'question-circle', 'voice', 'plus', 'minus', 'dislike', 'fail', 'succes']

class App extends React.Component {
  public render() {
    return (
      <div>
        {list.map(item => (<Icon key={item.toString()} type={item} size='xxs' />))}
      </div>
    );
  }
}

export default hot(module)(App);
