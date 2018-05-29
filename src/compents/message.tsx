import React, {PureComponent, ReactChildren} from 'react'

class MessageItem extends PureComponent {
  constructor (props: string, children: ReactChildren) {
    super(props)
  }
  public render() {
    return (
      <span>{this.props.children}</span>
    )
  }
}

export default MessageItem
