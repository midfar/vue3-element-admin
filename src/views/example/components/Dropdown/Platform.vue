<template>
  <el-dropdown :hide-on-click="false" :show-timeout="100" trigger="click">
    <el-button plain>
      Platfroms({{ platforms.length }})
      <i class="el-icon-caret-bottom el-icon--right" />
    </el-button>
    <template v-slot:dropdown>
      <el-dropdown-menu class="no-border">
        <el-checkbox-group v-model="platforms" style="padding: 5px 15px;">
          <el-checkbox v-for="item in platformsOptions" :key="item.key" :value="item.key">
            {{ item.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      required: true,
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      platformsOptions: [
        { key: 'a-platform', name: 'a-platform' },
        { key: 'b-platform', name: 'b-platform' },
        { key: 'c-platform', name: 'c-platform' }
      ]
    };
  },
  computed: {
    platforms: {
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
