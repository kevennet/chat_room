import React, { PureComponent } from 'react'
import { Subscription } from 'rxjs'
import MessageService, { random as _random } from '../services/messageService'
import Message from './message'

interface ContentContainer {
  person$: Subscription
}

class ContentContainer extends PureComponent {
  public readonly state = {
    _message: [{
      id: 1
    }],
    message: [{
      id: 1
    }],

  }
  constructor (props: string) {
    super(props)
  }
  public componentDidMount () {
    this.person$ = MessageService.message$.subscribe((messages: string[]) => {
      console.log(messages)
      this.setState({message: messages})
    })
  }
  public componentWillUnmount () {
    this.person$.unsubscribe()
  }

  public render() {
    const clickHandle = () => {
      if (this.state.message.length === 1) {
        this.person$ = MessageService.message$.subscribe((message: string[]) => {
          this.setState({message})
        })
      } else {
        this.person$.unsubscribe()
        this.setState({message: this.state._message})
      }
    }
    return (
      <div><span onClick={clickHandle}>click me</span>{
        this.state.message.map(item => (<Message key={item.id} {...item}>{_random}</Message>))
      }</div>
    )
  }
}

export default ContentContainer
