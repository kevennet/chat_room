import React, { PureComponent, Fragment } from 'react'

import WingBlank from 'antd-mobile/lib/wing-blank'
import 'antd-mobile/lib/wing-blank/style/css'

import Message from "./messageItem"

class App extends PureComponent {
  constructor (props) {
    super()
    this.state = {
      messgeList: props.messgeList
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    return {
      messgeList: nextProps.messgeList
    }
  }

  render() {
    return (
      <Fragment>
        <WingBlank style={{height: 'calc(100% - 45px - 199px)', overflowY: 'auto'}} >
          {
            (this.props.wsReady === undefined || this.props.wsReady) && this.state.messgeList.map(item =>{
              return (
                <Message key={item.id} {...item} />
              )
            })
          }
        </WingBlank>
      </Fragment>
    );
  }
}

export default App;
