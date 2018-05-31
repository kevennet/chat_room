export interface IPerson {
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
  id?: number,
  /**
   * @desc 姓名
   */
  name?: string,
}

export default class {
  constructor(opt: IPerson) {
    return opt
  }
}