import React, { Component } from 'react'

import Icon from 'antd-mobile/lib/icon'
import List from 'antd-mobile/lib/list'
import TextareaItem from 'antd-mobile/lib/textarea-item'
import Picker from 'antd-mobile/lib/picker'
import Toast from "antd-mobile/lib/toast"
import 'antd-mobile/lib/icon/style/css'
import 'antd-mobile/lib/list/style/css'
import 'antd-mobile/lib/textarea-item/style/css'
import 'antd-mobile/lib/picker/style/css'
import 'antd-mobile/lib/toast/style/css'

import　'./inputArea.css'

class App extends Component {
  constructor (props) {
    super()
    this.state = {
      scale: 0,
      inputMargin: 0,
      _inputMargin: 44,
      currentMessge: '请在这里输入消息'
    }
    this.district = [
      {
        value: '1232',
        label: '客服1'
      },
      {
        value: '1233',
        label: '客服2'
      },
      {
        value: '1234',
        label: '客服3'
      }
    ]
  }
  componentDidMount () {
    const scale = window.innerWidth / window.screen.width
    this.setState({scale})
  }
  changehandle = val => {

    this.setState({currentMessge: val})
  }
  focusHandle = () => {
    this.setState({inputMargin: this.state._inputMargin})
  }
  blurHandle = () => {
    this.setState({inputMargin: 0})
  }
  submitHandle = () => {
    //  {"type":"say","to_client_id":"'+to_client_id+'","to_client_name":"'+to_client_name+'","content":"'+input.value.replace(/"./g, '\\"').replace(/\n/g,'\\n').replace(/\r/g, '\\r')+'"}
    if (!!!this.props.clientList || this.props.clientList.length < 1) {
      Toast.info('客服正在换衣服。。请稍候', 2);
      return
    }
    const data = {
      type: 'say',
      to_client_id: this.props.clientList[this.props.clientList.length - 1].id,
      to_client_name: this.props.clientList[this.props.clientList.length - 1].name,
      content: this.state.currentMessge,
    }
    this.props.ws.sendMessage(`${JSON.stringify(data)}`)
    this.setState({
      currentMessge: ''
    })
  }
  PickerWrapedIcon = props => (
    <Icon
      type="ellipsis"
      onClick={props.onClick}
    />
  )
  render() {
    return (
      <List>
        <List.Item
          thumb={
            <Picker data={this.district} cols={1}>
              <this.PickerWrapedIcon />
            </Picker>
          }
          extra={<span onClick={this.submitHandle}>发送</span>}
          multipleLine
          activeStyle={false}
          align="middle"
        >
          <TextareaItem
            rows={3}
            disabled={!!!this.props.ws}
            placeholder="请输入聊天内容"
            onChange={(evt) => this.changehandle(evt)}
            onClick={(evt) => {
              evt.stopPropagation()
            }}
            value={this.state.currentMessge}
            clear
          />
        </List.Item>

      </List>
    );
  }
}

export default App;
