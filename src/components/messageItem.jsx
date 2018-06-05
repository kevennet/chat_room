import React, { PureComponent } from 'react'

import Flex from "antd-mobile/lib/flex";
import 'antd-mobile/lib/flex/style/css'
import './messageItem.css'

class App extends PureComponent {
  constructor (props) {
    super()
    this._type = Math.random()
    this.state = {
      from: props && props.from ? props.from : 'inoriF',
      to: props && props.to ? props.to : 'inoriT',
      content: props && props.content ? props.content : 'content',
      _type: this._type,
      type: props && props.type ? props.type : this._type > .5 ? 'recive' : 'send',
      timesmap: props && props.timesmap ? props.timesmap : new Date().toLocaleString()
    }
    this.mainRef = React.createRef()
  }

  componentDidMount = () => {
    console.log(
      this.mainRef.current.scrollIntoView ?
      this.mainRef.current.scrollIntoView() :
        this.mainRef.current.scrollIntoViewIfNeed ?
        this.mainRef.current.scrollIntoViewIfNeeded () :
        ''
    )
    // this.mainRef.scrollIntoView()
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
            <div className="timesmap" ref={this.mainRef}>{this.state.timesmap}</div>
          </div>
        </Flex.Item>
      </Flex>
    )
  }
}

export default App
