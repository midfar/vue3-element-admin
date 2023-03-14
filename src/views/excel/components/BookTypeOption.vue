<template>
  <div style="display:inline-block;">
    <label class="radio-label">Book Type: </label>
    <el-select v-model="bookType" style="width:120px;">
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: 'xlsx'
    }
  },
  data() {
    return {
      options: ['xlsx', 'csv', 'txt']
    };
  },
  computed: {
    bookType: {
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
