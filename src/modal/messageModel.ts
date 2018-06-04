const defaultValue: Message = {
  content: `测试消息${Math.random()}`,
  f_id: 1,
  id: 1,
  quote: `测试引用${Math.random()}`,
  quote_id: 1,
  t_id: 1,
  time: +new Date(),
  type: "send",
}
export interface Message {
  /**
   * @desc 消息id
   */
  id: number,
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
  quote_id?: number,
  /**
   * @desc 引用内容
   */
  quote?: string,
}
export class Message {
  constructor(opt: object) {
    return {...defaultValue, ...opt} as Message
  }
}
export default Message