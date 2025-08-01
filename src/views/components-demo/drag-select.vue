<template>
  <div class="components-container">
    <drag-select v-model="value" style="width:500px;" multiple placeholder="请选择一种水果" @change="handleChange">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </drag-select>

    <div style="margin-top:30px;">
      <el-tag v-for="item of value" :key="item" style="margin-right:15px;">
        {{ item }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import DragSelect from '@/components/DragSelect/index.vue'; // base on element-ui

export default defineComponent({
  name: 'DragSelectDemo',
  components: { DragSelect },
  data() {
    return {
      value: ['Apple', 'Banana', 'Orange'],
      options: [{
        value: 'Apple',
        label: 'Apple'
      }, {
        value: 'Banana',
        label: 'Banana'
      }, {
        value: 'Orange',
        label: 'Orange'
      }, {
        value: 'Pear',
        label: 'Pear'
      }, {
        value: 'Strawberry',
        label: 'Strawberry'
      }]
    };
  },
  methods: {
    handleChange(val) {
      console.log('drag-select handleChange', val);
    }
  }
});
</script>
