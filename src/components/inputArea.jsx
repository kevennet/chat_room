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

const PickerWrapedIcon = props => (
  <Icon
    type="ellipsis"
    onClick={props.onClick}
  />
)
class App extends Component {
  static getDerivedStateFromProps (props, state) {
    return {
      district: (props.clientList && props.clientList.map(item => ({
        value: item.id,
        label: item.name,
      }))) || []
    }
  }
  constructor (props) {
    super()
    this.state = {
      scale: 0,
      inputMargin: 0,
      _inputMargin: 44,
      currentMessge: '请在这里输入消息',
      currentPerson: null,
      district: []
    }
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
  submitKeyHandle = evt =>{
    if (`${evt.charCode}` === '13' && evt.ctrlKey) {
      this.submitHandle()
    }
  }
  submitHandle = () => {
    //  {"type":"say","to_client_id":"'+to_client_id+'","to_client_name":"'+to_client_name+'","content":"'+input.value.replace(/"./g, '\\"').replace(/\n/g,'\\n').replace(/\r/g, '\\r')+'"}
    if (!!!this.props.clientList || this.props.clientList.length < 1) {
      Toast.info('客服正在换衣服。。请稍候', 2);
      return
    }
    if (!!!this.state.currentPerson) {
      Toast.info('请先选择心仪的客服姐姐', 2);
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
  changeSelectHandle = val => {
    this.setState({
      currentPerson: val
    })
  }

  render() {
    return (
      <List>
        <List.Item
          thumb={
            <Picker data={this.state.district} cols={1} onChange={this.changeSelectHandle}>
              <PickerWrapedIcon />
            </Picker>
          }
          // extra={`发送`}
          // 修改字眼长度时需要配合修改 css: 11
          extra={<span onClick={this.submitHandle}>发送</span>}
          multipleLine
          activeStyle={false}
          align="middle"
          className={`patch-less-extra`}
        >
          <TextareaItem
            rows={3}
            disabled={!!!this.props.ws}
            placeholder="请输入聊天内容"
            onChange={(evt) => this.changehandle(evt)}
            onClick={(evt) => {
              evt.stopPropagation()
            }}
            onKeyPress={evt => this.submitKeyHandle(evt)}
            value={this.state.currentMessge}
            clear
          />
        </List.Item>

      </List>
    );
  }
}

export default App;
