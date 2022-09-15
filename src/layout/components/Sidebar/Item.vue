<!--<template>
  <svg-icon :icon-class="icon || 'sub-el-icon'" />
 <template #title>
    <span class="text">{{ title }}</span>
  </template>
</template> -->

<script>
import { defineComponent, h } from 'vue'; // renderSlot
import SvgIcon from '@/components/SvgIcon';

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    slots: {
      type: Function,
      default: () => { }
    }
  },
  render() {
    const vnodes = [];
    if (this.icon) {
      vnodes.push(h(SvgIcon, {
        'icon-class': this.icon || 'sub-el-icon'
      }));
    }
    // vnodes.push(
    //   h('span', {
    //     'class': 'text',
    //     'v-slot': 'title'
    //   }, this.title)
    // );
    vnodes.push(
      h('slot', {
        'name': 'title'
      }, this.title)
    );
    return vnodes;
  }
});
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
