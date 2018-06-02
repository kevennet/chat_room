import { Observable, Subject, BehaviorSubject } from 'rxjs'
import { scan, map } from 'rxjs/operators'
import Person, { Person as _person } from "../modal/personModel";

const initialPersons = (() => {
  try {
    return JSON.parse(localStorage.getItem('react-rxjs-todos') as string) as string[] || ['1', '2', `${+new Date()}`, `${Math.random()}`]
  } catch {
    return ['1', '2', `${+new Date()}`, `${Math.random()}`]
  }
})()

/**
 * @desc 创建人员所需参数
 */
type _creatFrom = number

interface PersonService {
  /**
   * @desc 具体操作rxjs的方法
   */
  creat$: Subject<_person>
  update$: BehaviorSubject<(person: _person[]) => {}>

  /**
   * @desc 作为动作通知队列，通知具体操作
   */
  creatPerson$: Subject<_person>

  /**
   * @desc 人员仓库，来源于rxjs操作后的结果统计
   */
  person$: Observable<{}>
}

class PersonService {
  constructor() {
    this.creat$ = new Subject()
    this.update$ = new BehaviorSubject((persons:_person[]) => persons)

    this.creatPerson$ = new Subject()

    this.person$ = this.update$
      .pipe(scan((persons: _person[], operation:(persons: _person[])=>{}) => operation(persons), initialPersons))

    this.creat$
      .pipe(map((person: _person) => (persons:_person[]) => persons.concat(person)))
      .subscribe(this.update$);

    this.creatPerson$
      .subscribe(this.creat$)
  }

  /**
   * 对外方法 - 新增人员
   * @param id 新增人员id
   */
  public add(id: _creatFrom) {
    this.creatPerson$
        .next(new Person({id}))
  }
  /**
   * 对外方法 - 选中人员
   * @param id 新增人员id
   */
  public choose(id: string|number) {
    // this.creatPerson$.next(id)
  }
  /**
   * 对外方法 - 移除人员
   * @param id 新增人员id
   */
  public remove(id: string) {
    // this.creatPerson$.next(id)
  }
}

export default new PersonService()
export const random = Math.random()
