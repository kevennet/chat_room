import { Observable, Subject, BehaviorSubject } from 'rxjs'
import { scan, publishReplay, refCount, map } from 'rxjs/operators'

const initialPersons = (() => {
  try {
    return JSON.parse(localStorage.getItem('react-rxjs-todos') as string) as string[] || ['1', '2', `${+new Date()}`, `${Math.random()}`]
  } catch {
    return ['1', '2', `${+new Date()}`, `${Math.random()}`]
  }
})()

interface PersonService {
  add$: Subject<any>
  creat$: Subject<string>
  update$: BehaviorSubject<(person: string[]) => {}>
  person$: Observable<{}>
}

class PersonService {
  constructor() {
    this.creat$ = new Subject()
    this.update$ = new BehaviorSubject((persons:string[]) => persons)

    this.add$ = new Subject()

    this.person$ = this.update$
      .pipe(scan((persons: string[], operation:(persons: string[])=>{}) => operation(persons), initialPersons))
      .pipe(publishReplay(1))
      .pipe(refCount())
    this.creat$
      .pipe(map((person:string) => {
        console.log(person)
        return (persons:string[]) => {
          console.log(persons)
          return persons.concat(person)
        }
      }))
      .subscribe(this.update$);

    this.add$.subscribe(this.creat$)
  }

  public add(title: string) {
    this.add$.next(title)
  }
}

export default new PersonService()
export const random = Math.random()
