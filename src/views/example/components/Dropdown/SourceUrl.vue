<template>
  <el-dropdown :show-timeout="100" trigger="click">
    <el-button plain>
      Link
      <i class="el-icon-caret-bottom el-icon--right" />
    </el-button>
    <template v-slot:dropdown>
      <el-dropdown-menu class="no-padding no-border" style="width:400px">
        <el-form-item label-width="0px" style="margin-bottom: 0px" prop="source_uri">
          <el-input v-model="source_uri" placeholder="Please enter the content">
            <template v-slot:prepend>
              URL
            </template>
          </el-input>
        </el-form-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  computed: {
    source_uri: {
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
