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
  id?: number|string,
  /**
   * @desc 姓名
   */
  name?: string,
}

export default class{
  constructor(opt: Person) {
    return opt as Person
  }
}