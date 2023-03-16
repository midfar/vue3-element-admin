/*
 * @Description: Socket构造函数
 * @Author: Cherry
 * @Date: 2022-07-21 10:29:53
 * @LastEditors: Cherry 2858937488@qq.com
 */

class Socket {
  constructor(options) {
    // 连接地址
    this.url = options.url || '';
    // 连接对象
    this.socket = null;
    // 是否允许重新连接
    this.lockReconnect = false;
    // 心跳间隔
    this.timeout = options.timeout || 1000 * 20;
    // 服务器响应间隔
    this.serverTimeout = options.serverTimeout || 2000;
    // 重连间隔
    this.reTimeout = options.reTimeout || 1000 * 10;
    // 心跳定时器
    this.timeoutTimer = null;
    // 服务器响应定时器
    this.serverTimeoutTimer = null;
    // 重连定时器
    this.reTimeoutTimer = null;
    // 重连计数，3次重连机制
    this.reCount = 0;
    // 制空打印方法
    const initConsole = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      log: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      error: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      warn: () => {}
    };
    // 开启控制台打印
    this.logs = options.openConsole ? console : initConsole;
    // 消息传递
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.onMsgEventCb = options.onMsgEventCb || (() => {});
    // 异常断开连接回调
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.onDisconnectCb = options.onDisconnectCb || (() => {});
  }

  // 建立连接
  create() {
    if (!this.url) {
      this.logs.error('请输入长连接地址');
      return;
    }
    // 创建WebSocket对象
    this.socket = new WebSocket(this.url);
    // 创建socket对象的事件监听
    this.initEvent();
  }

  // 建立事件监听
  initEvent() {
    if (!this.socket) {
      this.logs.error('长连接对象不存在，请先调用create方法创建长连接对象');
      return;
    }
    // 监听连接事件
    this.socket.addEventListener('open', this.onOpenEvent.bind(this));
    // 监听错误事件
    this.socket.addEventListener('error', this.onErrorEvent.bind(this));
    // 监听服务端发送消息事件
    this.socket.addEventListener('message', this.onMessageEvent.bind(this));
    // 监听关闭连接事件
    this.socket.addEventListener('close', this.onCloseEvent.bind(this));
  }

  // 移除事件监听
  removeEvent() {
    if (!this.socket) {
      this.logs.error('长连接对象不存在');
      return;
    }
    // 移除监听连接事件
    this.socket.removeEventListener('open', this.onOpenEvent.bind(this));
    // 移除监听错误事件
    this.socket.removeEventListener('error', this.onErrorEvent.bind(this));
    // 移除监听服务端发送消息事件
    this.socket.removeEventListener('message', this.onMessageEvent.bind(this));
    // 移除监听关闭连接事件
    this.socket.removeEventListener('close', this.onCloseEvent.bind(this));
  }

  // 连接成功回调
  onOpenEvent(e) {
    this.logs.log('onOpenEvent e:', e);
    const t = e.currentTarget || {};
    if (t.readyState === 1) {
      this.closeReConnect();
      this.heartCheckStart();
    }
  }

  // 连接失败回调
  onErrorEvent(err) {
    this.logs.error('onErrorEvent err:', err);
    this.reConnect();
  }

  // 接受服务端消息回调
  onMessageEvent(e) {
    this.logs.log('onMessageEvent e:', e);
    this.heartCheckReset();
    const { data } = e;
    try {
      const dataObj = data ? JSON.parse(data) : {};
      if (dataObj.msgType === 2 || dataObj.msgType === 3) {
        this.onMsgEventCb(dataObj);
      }
    } catch (err) {
      this.logs.log('data解析失败 err:', err);
    }
  }

  // 关闭连接回调
  onCloseEvent(e) {
    this.logs.log('onCloseEvent e:', e);
    this.logs.log(`websocket 断开: ${e.code} ${e.reason} ${e.wasClean}`);
    this.reConnect();
  }

  // 建立连接心跳
  heartCheckStart() {
    this.timeoutTimer = setTimeout(() => {
      this.send(
        JSON.stringify({
          msgType: 1,
          heart: true
        })
      );
      this.logs.log('send heart');

      // 3、发送数据 2s后没有接收到返回的数据进行关闭websocket重连
      this.serverTimeoutTimer = setTimeout(() => {
        this.logs.log('后台挂掉，没有心跳了....');
        clearTimeout(this.timeoutTimer);
        clearTimeout(this.serverTimeoutTimer);
        this.reConnect();
      }, this.serverTimeout);
    }, this.timeout);
  }

  // 重置连接心跳
  heartCheckReset() {
    clearTimeout(this.timeoutTimer);
    clearTimeout(this.serverTimeoutTimer);
    this.heartCheckStart();
  }

  // 重连
  reConnect() {
    this.timeoutTimer && clearTimeout(this.timeoutTimer);
    this.serverTimeoutTimer && clearTimeout(this.serverTimeoutTimer);
    if (!this.socket) {
      this.logs.log('无长连接对象');
      return;
    }
    this.logs.log('reConnect reCount:', this.reCount, ' lockReconnect:', this.lockReconnect);
    if (this.lockReconnect) return;
    if (this.reCount > 2) {
      this.closeReConnect();
      this.close();
      this.removeEvent();
      this.socket = null;
      this.onDisconnectCb();
      return;
    }

    this.lockReconnect = true;
    // 没连接上会一直重连，设置延迟避免请求过多
    this.reTimeoutTimer && clearTimeout(this.reTimeoutTimer);
    this.reTimeoutTimer = setTimeout(() => {
      this.close();
      this.removeEvent();
      this.socket = null;
      this.create();
      this.reCount += 1;
      this.lockReconnect = false;
    }, this.reTimeout);
  }

  // 取消重连
  closeReConnect() {
    this.reTimeoutTimer && clearTimeout(this.reTimeoutTimer);
    this.reCount = 0;
    this.lockReconnect = false;
  }

  // 发送消息方法
  send(data) {
    if (!this.socket) {
      this.logs.error('长连接对象不存在，请先调用create方法创建长连接对象');
      return;
    }
    this.socket.send(data);
  }

  // 发送消息内容
  sendMsgCustom(msg) {
    this.send(JSON.stringify({
      msgType: 2,
      id: `${new Date().getTime()}`, // demo简单定义，id规则建议用uuid
      content: msg,
      self: true
    }));
  }

  // 关闭连接方法
  close() {
    if (!this.socket) {
      this.logs.error('长连接对象不存在');
      return;
    }
    this.socket.close();
  }

  // 注销方法
  destroy() {
    if (!this.socket) {
      this.logs.log('无长连接对象');
      return;
    }
    this.timeoutTimer && clearTimeout(this.timeoutTimer);
    this.serverTimeoutTimer && clearTimeout(this.serverTimeoutTimer);
    this.closeReConnect();
    this.close();
    this.removeEvent();
    this.socket = null;
  }
}

export default Socket;
