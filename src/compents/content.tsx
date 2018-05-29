import React, { PureComponent } from 'react'
import Message from './message'

class ContentContainer extends PureComponent {
  public readonly state = {
    message: [1,2,3]
  }
  constructor (props: string) {
    super(props)
  }
  public render() {
    return (
      <div>{
        this.state.message.map(item => (<Message>{item}</Message>))
      }</div>
    )
  }
}

export default ContentContainer
