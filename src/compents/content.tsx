import React, { PureComponent } from 'react'
import { Subscription } from 'rxjs'
import personService, { random as _random } from '../services/personService'
import Message from './message'

interface ContentContainer {
  person$: Subscription
}

class ContentContainer extends PureComponent {
  public readonly state = {
    message: [{
      id: 1
    }]
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
    const clickHandle = () => {
      if (this.state.message.length === 1) {
        this.person$ = personService.person$.subscribe((persons: string[]) => {
          this.setState({message: persons})
        })
      } else {
        this.person$.unsubscribe()
        this.setState({message: [{
          id: 1
        }]})
      }
    }
    return (
      <div><span onClick={clickHandle}>click me</span>{
        this.state.message.map(item => (<Message key={item.id}>{_random}</Message>))
      }</div>
    )
  }
}

export default ContentContainer
