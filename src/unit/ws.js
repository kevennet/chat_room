

const wsURL = 'ws://192.168.1.161:7272'

const loginData = {
  type: 'login',
  client_name: `${/master/.test(window.location.href) ? `manage_a` : `inori${Math.random().toString().replace(/0\./, '')}`}`,
  room_id: '1'
}

const serviceFailError = {
  code: '503',
  message: 'WebSocket对象异常'
}
const addressFailError = {
  code: '404',
  message: 'WebSocket服务器响应异常'
}

export const wsPromise = new Promise((resolve, reject) => {
  let socket
  if (!WebSocket) reject(new Error(`${JSON.stringify(serviceFailError)}`))

  function errHandle (err) {
    socket.removeEventListener('message', openHandle)
    const assignedError = {...addressFailError, _err_string: JSON.stringify(err)}
    reject(new Error(`${JSON.stringify(assignedError)}`))
  }
  function openHandle (evt) {
    socket.removeEventListener('error', errHandle)
    // 登陆
    socket.send(`${JSON.stringify(loginData)}`)
    resolve({socket, res: evt })
  }

  try {
    // 如果服务器返回奇怪的回应会导致程序崩掉，连addEventListener的机会都没有
    socket = new WebSocket(wsURL);

    socket.addEventListener('error', errHandle, {once: true})

    socket.addEventListener('open', openHandle, {once: true})
  } catch (err) {
    errHandle(err)
  }

})

export class ws {
  constructor(opt) {
    try {
      const { websocket, messageHandle, closeHandle, errorHandle } = opt
      this.websocket = websocket
      this.messageHandle = messageHandle
      this.closeHandle = closeHandle
      this.errorHandle = errorHandle
      websocket.addEventListener('message', function (res) {
        messageHandle(res)
      })
      websocket.addEventListener('close', function (res) {
        closeHandle(res)
      })
      websocket.addEventListener('error', function (res) {
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
  sendMessage = (opt) => {
    this.websocket.send(opt)
  }
}

export default wsPromise
