<template>
  <div class="components-container">
    <el-button type="primary" @click="dialogTableVisible = true">
      open a Drag Dialog
    </el-button>
    <el-dialog v-model="dialogTableVisible" title="Shipping address">
      <div v-el-drag-dialog>
        <el-select ref="select" v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-table :data="gridData">
          <el-table-column property="date" label="Date" width="150" />
          <el-table-column property="name" label="Name" width="200" />
          <el-table-column property="address" label="Address" />
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import elDragDialog from '@/directive/el-drag-dialog'; // base on element-ui
import emitter from 'tiny-emitter/instance';

export default defineComponent({
  name: 'DragDialogDemo',
  directives: { elDragDialog },
  data() {
    return {
      dialogTableVisible: false,
      options: [
        { value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' }
      ],
      value: '',
      gridData: [{
        date: '2016-05-02',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-04',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-01',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }, {
        date: '2016-05-03',
        name: 'John Smith',
        address: 'No.1518,  Jinshajiang Road, Putuo District'
      }]
    };
  },
  mounted() {
    emitter.on('elDialogDragDialog', this.handleDrag);
  },
  beforeUnmount() {
    emitter.off('elDialogDragDialog', this.handleDrag);
  },
  methods: {
    // v-el-drag-dialog onDrag callback function
    handleDrag() {
      console.log('handleDrag');
      this.$refs.select.blur();
    }
  }
});
</script>
