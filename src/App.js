import React, { Component, Fragment } from 'react';

import Toast from "antd-mobile/lib/toast";
import 'antd-mobile/lib/toast/style/css'

import Header from "./components/header";
import Container from "./components/main";
import InputArea from "./components/inputArea";
import { wsPromise, ws } from "./unit/ws";
import './App.css';

// TODO: PureComponent 会导致人员添加失败
class App extends Component {
  constructor () {
    super()
    this.state = {
      wsReady: false,
      messgeList: [
        {
          id: 1,
          from: '001',
          to: '002',
          content: '百分百爱你',
          timesmap: +new Date()
        },
        {
          id: 2,
          from: '001',
          to: '002',
          content: '百分百爱你11212',
          timesmap: +new Date()
        }
      ]
    }
  }
  componentWillMount () {
    // Toast.loading(content, duration, onClose, mask)
    Toast.loading('', 0, () => {}, true)
    wsPromise.then(res => {
      this.ws = new ws({
        websocket: res.socket,
        messageHandle: this.messageHandle,
        closeHandle: this.closeHandle,
        errorHandle: this.errorHandle
      })
      this.setState({
        wsReady: true
      })
    }, err => {
      this.setState({
        wsReady: false
      })
    })
  }
  componentDidUpdate () {
    if (this.state.wsReady) Toast.hide()
  }

  messageHandle = (res) => {
    try {
      const data = JSON.parse(res.data).type
      if (data === 'ping') {
        this.ws.sendMessage('{"type":"pong"}');
      } else if (data === 'login') {
        // {"type":"login","client_id":"7f00000108fe00000010","client_name":"inori5384097704063824","time":"2018-06-05 14:09:57","client_list":{"7f00000108ff0000000d":"xiao_ming"}}
        const data = JSON.parse(res.data)
        if (data.client_list) {
          let client_list = []
          for(let item of Object.keys(data.client_list)) {
            if (data.client_id !== item) {
              client_list.push({
                id: item,
                name: data.client_list[item]
              })
            }
          }
          this.setState({
            id: data.client_id,
            name: data.client_name,
            client_list: client_list
          })
        } else {
          this.setState((prevState, props) => {
            prevState.client_list.push({
              id: data.client_id,
              name: data.client_name,
            })
            return {
              client_list: prevState.client_list
            }
          })
        }
      } else if (data === 'say') {
        // {"type":"say","from_client_id":"7f00000108fd00000018","from_client_name":"manage_a","to_client_id":"7f00000108ff00000021","content":"<b>\u4f60\u5bf9inori2452290105743684\u8bf4: <\/b>\u8bf7\u5728\u8fd9\u91cc\u8f93\u5165\u6d88\u606f","time":"2018-06-05 16:12:23"}
        const data = JSON.parse(res.data)
        console.log(data)
        this.setState((prevState, props) => {
          return {
            messgeList: [...prevState.messgeList, {
              id: +new Date(),
              from: data.from_client_name,
              to: data.to_client_id,
              content: data.content.replace(/.+<\/b>/, ''),
              timesmap: +new Date(),
              type: data.from_client_id === prevState.id ? 'send' : 'recive'
            }]
          }
        })
        console.log(res.data)
      } else if (data === 'logout') {
        // {"type":"logout","from_client_id":"7f00000108ff00000006","from_client_name":"xiao_ming","time":"2018-06-05 14:34:57"}
        const data = JSON.parse(res.data)
        this.setState((prevState, props) => {
          const index = prevState.client_list.findIndex(item => item.id === data.from_client_id)
          if (index && prevState.client_list[index]) {
            return {
              client_list: [...prevState.client_list.slice(0, index),...prevState.client_list.slice(index + 1, )]
            }
          } else {
            return prevState
          }
        })
      } else {
        //
        console.log(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  closeHandle (res) {
    Toast.fail('聊天室已关闭，请刷新页面尝试重连', 0, () => {}, true)
    console.log(res)
  }
  errorHandle (res) {
    Toast.fail('聊天室意外关闭，请刷新页面尝试重连', 0, () => {}, true)
    console.log(res)
  }
  render() {
    return (
      <Fragment>
        {/* 导航相关 */}
        <Header />
        {/* 信息展示 */}
        <Container wsReady={this.state.wsReady} messgeList={this.state.messgeList} />
        {/* 消息输入 */}
        <InputArea ws={this.ws} clientList={this.state.client_list} />
      </Fragment>
    );
  }
}

export default App;
