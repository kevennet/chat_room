import { Subject, Observable } from 'rxjs'

const initialPersons = (() => {
  try {
    return JSON.parse(localStorage.getItem('react-rxjs-todos') as string) as string[] || []
  } catch {
    return []
  }
})()

interface PersonService {
  creat$: Subject<string>
  person$: any
}

class PersonService {
  constructor() {
    this.creat$ = new Subject()
    this.person$ = Observable.create(['1', '2', ...initialPersons])
  }

  public add(title: string) {
    this.creat$.next(title)
  }
}

export default new PersonService()
