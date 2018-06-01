import React, { PureComponent } from 'react'
import { Subscription } from 'rxjs'
import personService, { random as _random } from '../services/personService'
import Message from './message'

interface ContentContainer {
  person$: Subscription
}

class ContentContainer extends PureComponent {
  public readonly state = {
    message: ['1']
  }
  constructor (props: string) {
    super(props)
  }
  public componentDidMount () {
    this.person$ = personService.person$.subscribe((persons: string[]) => {
      console.log(persons)
      this.setState({message: persons})
    })
  }
  public componentWillUnmount () {
    this.person$.unsubscribe()
  }
  public render() {
    return (
      <div>{
        this.state.message.map(item => (<Message key={item.toString()}>{_random}</Message>))
      }</div>
    )
  }
}

export default ContentContainer
