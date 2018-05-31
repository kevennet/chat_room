
export interface IMessage {
  /**
   * @desc 消息id
   */
  id?: number,
  /**
   * @desc 发送人id
   */
  f_id?: number,
  /**
   * @desc 接收人id
   */
  t_id?: number,
  /**
   * @desc 消息内容
   */
  content?: string,
  /**
   * @desc 消息时间戳
   */
  time?: number,
  /**
   * @desc 消息方向类型
   */
  type?: 'send' | 'receive',
  /**
   * @desc 引用内容id
   */
  quote_id?: string,
  /**
   * @desc 引用内容
   */
  quote?: string,
}

export default class {
  constructor(opt: IMessage) {
    return opt
  }
}