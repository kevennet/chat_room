export interface Person {
  /**
   * @desc 头像
   */
  logo?: string,
  /**
   * @desc 简介
   */
  summary?: string,
  /**
   * @desc id
   */
  id: number,
  /**
   * @desc 姓名
   */
  name?: string,
}

export class Person {
  constructor(opt: Person) {
    return opt as Person
  }
}

export default Person