import React, { Component } from 'react'

import Icon from 'antd-mobile/lib/icon'
import List from 'antd-mobile/lib/list'
import TextareaItem from 'antd-mobile/lib/textarea-item'
import 'antd-mobile/lib/icon/style/css'
import 'antd-mobile/lib/list/style/css'
import 'antd-mobile/lib/textarea-item/style/css'
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

  focusHandle = () => {
    this.setState({inputMargin: this.state._inputMargin})
  }
  blurHandle = () => {
    this.setState({inputMargin: 0})
  }
  submitHandle = () => {
    alert('submit')
  }
  addFileHandle = () => {
    alert('addFileHandle')
  }
  render() {
    return (
        <List>
          <List.Item
            thumb={<Icon
              type="ellipsis"
              onClick={(evt) => {
                evt.stopPropagation()
                this.addFileHandle()
              }}
            />}
            arrow="horizontal"
            multipleLine
            activeStyle={null}
            align="middle"
            onClick={this.submitHandle}
          >
            <TextareaItem
              rows={3}
              placeholder="请输入聊天内容"
              onClick={(evt) => {
                evt.stopPropagation()
              }}
              clear
            />
          </List.Item>
        </List>
    );
  }
}

export default App;
