import React, { PureComponent, Fragment } from 'react'

import Message from "./messageItem";
import WingBlank from 'antd-mobile/lib/wing-blank'
import 'antd-mobile/lib/wing-blank/style/css'


class App extends PureComponent {
  constructor () {
    super()
    this.state = {
      messgeList: [
        {
          id: 1,
          from: '001',
          to: '002',
          content: '010101',
          timesmap: +new Date()
        },
        {
          id: 2,
          from: '001',
          to: '002',
          content: '010101',
          timesmap: +new Date()
        }
      ]
    }
  }
  render() {
    return (
      <Fragment>
        <WingBlank style={{height: 'calc(100% - 45px - 199px)'}}>
          {
            this.state.messgeList.map(item =>{
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
