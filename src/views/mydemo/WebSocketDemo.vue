<!--
 * @Author: Cherry 2858937488@qq.com
 * @Date: 2023-03-14 10:40:55
 * @LastEditors: Cherry 2858937488@qq.com
 * @LastEditTime: 2023-03-16 20:57:15
 * @FilePath: \vue3-admin\vue3-element-admin\src\views\mydemo\WebSocketDemo.vue
 * @Description: websocket
-->
<template>
  <div class="web-socket-demo">
    <h3>node搭建WebSocket服务器</h3>
    <p>一、新建文件夹demo,然后用npm init命令新建一个项目ws-demo</p>
    <p>mkdir demo</p>
    <p>cd demo</p>
    <p>npm init</p>

    <h3>二、安装依赖ws</h3>
    <p>npm install ws</p>

    <h3>三、修改入口文件index.js</h3>
    <p>const WebSocket = require('ws') </p>
    <p>const ws = new WebSocket.Server({ port: 5001 })</p>
    <p>ws.on('connection', ws => {</p>
    <p>console.log('server connection')</p>

    <p>ws.on('message', msg => {</p>

    <p>console.log('服务端接收的消息：', msg)</p>

    <p>const data = JSON.parse(msg)</p>
    <p>console.log('服务端接收的消息解析：', data)</p>

    <p>if(data.msgType === 1){</p>
    <p>ws.send(JSON.stringify({</p>
    <p> msgType: 1,</p>
    <p> heart: true</p>
    <p>}))</p>
    <p>}else{</p>
    <p>ws.send(JSON.stringify({</p>
    <p> msgType: 3,</p>
    <p> content: '接收成功',</p>
    <p> data})</p>
    <p>)</p>
    <p>ws.send(JSON.stringify({</p>
    <p> msgType: 2,</p>
    <p> id: `${new Date().getTime()}`,//demo简单定义，id规则建议用uuid</p>
    <p> content: '模拟回复',</p>
    <p> self: false</p>
    <p>}))</p>
    <p>}</p>
    <p>})</p>

    <p>ws.send(JSON.stringify({</p>
    <p> msgType: 0,</p>
    <p> content: '连接已建立'</p>
    <p>}))</p>

    <p>})</p>

    <h3>四、运行index.js</h3>
    <p>node index.js</p>

    <h3>五、本地交互</h3>
    <div class="item">请输入运行地址进行连接：</div>
    <div class="flex">
      <el-input v-model="linkUrl" placeholder="连接地址" />
      <el-button type="primary" @click="startConnection" v-if="!isConnected">连接</el-button>
      <el-button type="primary" v-else @click="disconnected">断开连接</el-button>
    </div>
    <div class="item">信息交互：</div>
    <div class="flex">
      <el-input v-model="msg" placeholder="交互信息" placeholder-class="input-placeholder" />
      <el-button type="primary" @click="sendMsg" :disabled="disabled">发送</el-button>
    </div>
    <div class="item">信息列表：</div>
    <div class="list">
      <div v-for="item in msgList" :key="item.id" :class="item.self ? 'self' : 'other'">{{ item.content }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Socket from '@/utils/websocket.js';
import webSocketStore from '@/store/modules/webSocket';
import userStore from '@/store/modules/user';
import { ElMessage } from 'element-plus';

interface MsgObj {
  id: string | number,
  content: string,
  self: boolean
}

const linkUrl = ref<string>('ws://127.0.0.1:5001');// 连接地址
const socket = ref<any>(null); // 长连接对象
const isConnected = ref<boolean>(false);// 是否连接
const msg = ref<string>('');
const disabled = ref<boolean>(false);// 是否禁止发送消息
const msgList = ref<MsgObj[]>([]);

const startConnection = () => {
  if (!linkUrl.value) {
    ElMessage({
      message: '连接地址不能为空！',
      type: 'error'
    });
    return;
  }
  isConnected.value = true;
  createSocket();
};

const disconnected = () => {
  disabled.value = false;
  isConnected.value = false;
  destroySocket();
};

const sendMsg = () => {
  if (!socket.value) {
    ElMessage({
      message: '请先建立连接！',
      type: 'error'
    });
    return;
  }
  if (!msg.value) {
    ElMessage({
      message: '发送的消息内容不能为空！',
      type: 'error'
    });
    return;
  }
  disabled.value = true;
  socket.value.sendMsgCustom(msg.value);
};

const createSocket = () => {
  console.log('创建长连接', !socket.value);
  const useWebSocketStore = webSocketStore();
  const useUserStore = userStore();
  const id = useWebSocketStore.getSocketID() || `${useUserStore.userId}-${new Date().getTime() / 1000}`;
  if (!useWebSocketStore.getSocketID()) {
    useWebSocketStore.setSocketID(id);
  }
  socket.value = new Socket({
    url: linkUrl.value + '/' + id,
    openConsole: process.env.NODE_ENV !== 'production',
    onMsgEventCb: getMsg,
    onDisconnectCb: disconnectCallback
  });
  socket.value.create();
};

// 接受消息
const getMsg = (dataObj) => {
  console.log('getMsg:', dataObj);
  if (dataObj.msgType === 3) {
    ElMessage({
      message: '发送成功！',
      type: 'success'
    });
    msgList.value.push(dataObj.data);
    msg.value = '';
    disabled.value = false;
    return;
  }
  msgList.value.push(dataObj);
};

// 断开连接提示
const disconnectCallback = () => {
  socket.value = null;
  ElMessage({
    message: '连接已断开...',
    type: 'warning'
  });
  disconnected();
};

// 销毁长连接
const destroySocket = () => {
  console.log('销毁长连接', !!socket.value);
  if (!socket.value) return;
  socket.value.destroy();
  socket.value = null;
};
</script>

<style lang="scss" scoped>
.web-socket-demo {
  padding: 20px;
}

.flex {
  width: 500px;
  display: flex;
}

.item {
  margin: 10px 0;
}

.list {
  width: 500px;
  margin: 10px 0;
  padding: 20px;
  border: 1px solid #efe;
}

.self {
  margin: 10px 0;
}

.other {
  margin: 10px 0;
  text-align: right;
}
</style>
