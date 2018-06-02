import { Observable, Subject, BehaviorSubject } from 'rxjs'
import { scan, map } from 'rxjs/operators'
import Message, { Message as _message } from "../modal/messageModel";

const debugMessages = [
  {id: 1},
  {id: 2},
  {id: +new Date()},
  {id: Math.random()}
]
const initialMessages = (() => {
  try {
    return JSON.parse(localStorage.getItem('react-rxjs-todos') as string) as string[] || debugMessages
  } catch {
    return debugMessages
  }
})()

/**
 * @desc 创建信息所需参数
 */
type _creatFrom = number

interface MessageService {
  /**
   * @desc 具体操作rxjs的方法
   */
  creat$: Subject<_message>
  update$: BehaviorSubject<(person: _message[]) => {}>

  /**
   * @desc 作为动作通知队列，通知具体操作
   */
  creatMessage$: Subject<_message>

  /**
   * @desc 信息仓库，来源于rxjs操作后的结果统计
   */
  message$: Observable<{}>
}

class MessageService {
  constructor() {
    this.creat$ = new Subject()
    this.update$ = new BehaviorSubject((persons:_message[]) => persons)

    this.creatMessage$ = new Subject()

    this.message$ = this.update$
      .pipe(scan((persons: _message[], operation:(persons: _message[])=>{}) => operation(persons), initialMessages))

    this.creat$
      .pipe(map((person: _message) => (persons:_message[]) => {
        console.log(person, persons)
        return persons.concat(person)
      }))
      .subscribe(this.update$);

    this.creatMessage$
      .subscribe(this.creat$)
  }

  /**
   * 对外方法 - 新增信息
   * @param id 新增信息id
   */
  public add(id: _creatFrom) {
    this.creatMessage$
        .next(new Message({id}))
  }
  /**
   * 对外方法 - 选中信息
   * @param id 新增信息id
   */
  public choose(id: string|number) {
    // this.creatPerson$.next(id)
  }
  /**
   * 对外方法 - 移除信息
   * @param id 新增信息id
   */
  public remove(id: string) {
    // this.creatPerson$.next(id)
  }
}

export default new MessageService()
export const random = Math.random()
