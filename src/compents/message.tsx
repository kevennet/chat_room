import React, { MouseEvent, SFC } from 'react'
import { Message } from '../modal/messageModel'
import MessageService, { random as _random } from '../services/messageService'

const initialProps: Message = {
  content: '对话内容',
  id: 1,
  time: +new Date,
  type: 'receive'
}

const MessageItem:SFC<Message> = (props) => {
  const {content, id, time, type, children} = {...initialProps, ...props}
  const clickHandle = (evt: MouseEvent<HTMLElement>) => {
    MessageService.add(+new Date())
  }
  return type === 'receive' ?
  (
    <div className="MessageItemBlock">
      <div className="logo cover_img">
        {/* <img src={logo} alt="logo"/> */}
      </div>
      <div className="main">
        <div className="id" onClick={clickHandle}>{id}{_random}</div>
        {/* <div className="name">{name}</div> */}
        {/* <div className="addon">{summary}</div> */}
        <div className="content">{content}{`${children === _random}`}</div>
        <div className="time">{time}</div>
      </div>
    </div>
  ) :
  (
    <div className="MessageItemBlock">
      <div className="logo cover_img">
        {/* <img src={logo} alt="logo"/> */}
      </div>
      <div className="main">
        {/* <div className="name">{name}</div> */}
        {/* <div className="addon">{summary}</div> */}
        <div className="content">{content}</div>
        <div className="time">{time}</div>
      </div>
    </div>
  )
}

export default MessageItem
