import React, { PureComponent } from 'react'

import Flex from "antd-mobile/lib/flex";
import 'antd-mobile/lib/flex/style/css'
import './messageItem.css'

class App extends PureComponent {
  constructor () {
    super()
    this._type = Math.random()
    this.state = {
      from: this.props && this.props.from ? this.props.from : 'inoriF',
      to: this.props && this.props.to ? this.props.to : 'inoriT',
      content: this.props && this.props.content ? this.props.content : 'content',
      _type: this._type,
      type: this.props && this.props.type ? this.props.type : this._type > .5 ? 'recive' : 'send',
      timesmap: this.props && this.props.timesmap ? this.props.timesmap : new Date().toLocaleString()
    }
  }
  render () {
    return (
      <Flex className={`message_item ${this.state.type}`} align="end">
        <div className="logo cover_img">
          <img src="https://tse2.mm.bing.net/th?id=OIP.l-Uu300_prYNcFAqnTC31QHaHa&pid=Api" alt="inori"/>
        </div>
        <Flex.Item>
          <div className="main_content">
            <div className="header">{this.state.from}</div>
            <div className="content">{/<img .+\/>/.test(this.state.content) ? 'img' : unescape(this.state.content)}</div>
            <div className="timesmap">{this.state.timesmap}</div>
          </div>
        </Flex.Item>
      </Flex>
    )
  }
}

export default App
