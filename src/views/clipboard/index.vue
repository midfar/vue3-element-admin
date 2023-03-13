<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="use clipboard  directly" name="directly">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" :icon="Document" @click="handleCopy(inputData, $event)">
          copy
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="use clipboard by v-directive" name="v-directive">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" :icon="Document">
          copy
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clip from '@/utils/clipboard'; // use clipboard directly
import clipboard from '@/directive/clipboard'; // use clipboard by v-directive
import { defineComponent, markRaw } from 'vue';
import { Document } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'ClipboardDemo',
  directives: {
    clipboard
  },
  data() {
    return {
      activeName: 'directly',
      inputData: 'https://element-plus.midfar.com',
      Document: markRaw(Document)
    };
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event);
    },
    clipboardSuccess() {
      ElMessage({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      });
    }
  }
});
</script>

