import React, { Component } from 'react'

import List from 'antd-mobile/lib/list'
import InputItem from 'antd-mobile/lib/input-item'
import 'antd-mobile/lib/list/style/css'
import 'antd-mobile/lib/input-item/style/css'
import　'./inputArea.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      scale: 0,
      inputMargin: 0,
      _inputMargin: 44,
    }
  }
  componentDidMount () {
    const scale = window.innerWidth / window.screen.width
    this.setState({scale})
  }
  focusHandle = (evt) => {
    this.setState({inputMargin: this.state._inputMargin})
  }
  blurHandle = (evt) => {
    this.setState({inputMargin: 0})
  }
  render() {
    return (
        <List>
          <InputItem
            placeholder="请输入聊天内容"
            onFocus={this.focusHandle}
            onBlur={this.blurHandle}
            className={`bottomInput`}
            style={{
              bottom: `${this.state.inputMargin}px`,
            }}
          />
        </List>
    );
  }
}

export default App;
