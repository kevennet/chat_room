import React, {ReactChild, PureComponent} from 'react'


type InitialProps = {
  /**
   * @desc 对话内容
   */
  content?: string,
  /**
   * @desc 个人头像
   */
  logo?: string,
  /**
   * @desc 个人简介
   */
  summary?: string,
  /**
   * @desc 时间戳
   */
  time?: Number,
  /**
   * @desc 我的还是别人的
   */
  type?: 'me' | 'others' | ReactChild,
}
const initialProps: InitialProps = {
  content: '对话内容',
  logo: '',
  summary: '',
  time: +new Date,
  type: 'me'
}

/**
 * @class 单个对话框
 */
class MessageItem extends PureComponent {
  constructor (props: InitialProps = {}) {
    const mergedProps: InitialProps = Object.assign(props, initialProps)
    super(mergedProps)
  }
  public render() {
    return (
      <div>
        <span>{this.props.children}</span>
      </div>
    )
  }
}

export default MessageItem
