

const wsURL = 'ws://localhost:8080'

const serviceFailError = {
  code: '503',
  message: 'WebSocket对象异常'
}
const addressFailError = {
  code: '404',
  message: 'WebSocket服务器响应异常'
}

export const wsPromise = new Promise((resolve, reject) => {

  if (!WebSocket) reject(new Error(`${JSON.stringify(serviceFailError)}`))

  const socket = new WebSocket(wsURL);
  socket.addEventListener('error', (err) => {
    socket.removeEventListener('message')
    const assignedError = {...addressFailError, _err_string: JSON.stringify(err)}
    reject(new Error(`${JSON.stringify(assignedError)}`))
  }, {once: true})

  socket.addEventListener('message', (evt) => {
    socket.removeEventListener('error')
    resolve({socket, res: evt })
  }, {once: true})
})

export class ws {
  constructor(opt) {
    try {
      const { websocket, messageHandle, closeHandle, errorHandle } = opt
      websocket.on('message', function (res) {
        messageHandle(res)
      })
      websocket.on('close', function (res) {
        closeHandle(res)
      })
      websocket.on('error', function (res) {
        errorHandle(res)
      })
    } catch (e) {
      return e
    }
  }

  triggerMessage = (opt) => {
    this.messageHandle(opt)
  }
  triggerClose = (opt) => {
    this.closeHandle(opt)
  }
  triggerError = (opt) => {
    this.closeHandle(opt)
  }
}

export default wsPromise
