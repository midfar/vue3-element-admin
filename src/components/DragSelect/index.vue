<template>
  <el-select ref="dragSelect" v-model="selectVal" v-bind="$attrs" class="drag-select" multiple v-on="$attrs">
    <slot />
  </el-select>
</template>

<script>
import { defineComponent } from 'vue';
import Sortable from 'sortablejs';

export default defineComponent({
  name: 'DragSelect',
  props: {
    modelValue: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: null
    },
    style: {
      type: [String, Object],
      default: null
    }
  },
  computed: {
    selectVal: {
      get() {
        return [...this.modelValue];
      },
      set(val) {
        this.$emit('update:modelValue', [...val]);
      }
    }
  },
  mounted() {
    this.setSort();
  },
  methods: {
    setSort() {
      const el = this.$refs.dragSelect.$el.querySelector('.el-select__wrapper .el-select__selection');
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '');
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          const theValue = this.modelValue;
          const targetRow = theValue.splice(evt.oldIndex, 1)[0];
          theValue.splice(evt.newIndex, 0, targetRow);
        }
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.drag-select {
  :deep(.sortable-ghost .el-tag) {
    opacity: .8;
    color: #fff !important;
    background: #42b983 !important;
  }
  :deep(.el-tag) {
    cursor: pointer;
  }
}
</style>
