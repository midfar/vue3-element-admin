<template>
  <div style="display:inline-block;">
    <label class="radio-label" style="padding-left:0;">Filename: </label>
    <el-input v-model="filename" placeholder="Please enter the file name (default excel-list)" style="width:345px;" :prefix-icon="IconDocument" />
  </div>
</template>

<script>
import { defineComponent, markRaw } from 'vue';
import { Document as IconDocument } from '@element-plus/icons-vue';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      IconDocument: markRaw(IconDocument)
    };
  },
  computed: {
    filename: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      }
    }
  }
});
</script>
