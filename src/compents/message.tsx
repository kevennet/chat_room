import React, { MouseEvent, SFC } from 'react'
import { IMessage } from '../modal/messageModel'
// import { person } from '../modal/personModel'
// import { Observable } from 'rxjs'
import personService from '../services/personService'

const initialProps: IMessage = {
  content: '对话内容',
  id: 1,
  time: +new Date,
  type: 'receive'
}

const MessageItem:SFC<IMessage> = (props) => {
  const {content, id, time, type} = {...initialProps, ...props}
  const clickHandle = (evt: MouseEvent<HTMLElement>) => {
    personService.add('testtitle')
    console.log(personService.person$)
  }
  return type === 'receive' ?
  (
    <div className="MessageItemBlock">
      <div className="logo cover_img">
        {/* <img src={logo} alt="logo"/> */}
      </div>
      <div className="main">
        <div className="id" onClick={clickHandle}>{id}</div>
        {/* <div className="name">{name}</div> */}
        {/* <div className="addon">{summary}</div> */}
        <div className="content">{content}</div>
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
