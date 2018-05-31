import React, { PureComponent } from 'react'
import { Subscription } from 'rxjs'
import personService from '../services/personService'
import Message from './message'

interface ContentContainer {
  person$: Subscription
}

class ContentContainer extends PureComponent {
  public readonly state = {
    message: [1,2,3]
  }
  constructor (props: string) {
    super(props)
  }
  public componentDidMount () {
    this.person$ = personService.creat$.subscribe(persons => this.setState({persons}))
  }
  public componentWillUnmount () {
    this.person$.unsubscribe()
  }
  public render() {
    return (
      <div>{
        this.state.message.map(item => (<Message key={item.toString()}>{item}</Message>))
      }</div>
    )
  }
}

export default ContentContainer
