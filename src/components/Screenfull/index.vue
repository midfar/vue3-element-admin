<template>
  <div>
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="click" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import screenfull, { bindF11, unbindF11 } from '@/utils/screenfull';

export default defineComponent({
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    };
  },
  mounted() {
    this.init();
    bindF11();
  },
  beforeUnmount() {
    this.destroy();
    unbindF11();
  },
  methods: {
    click() {
      console.log('screenfull.isEnabled=', screenfull.isEnabled, 'screenfull.isFullscreen=', screenfull.isFullscreen);
      if (!screenfull.isEnabled) {
        ElMessage({
          message: 'you browser can not work',
          type: 'warning'
        });
        return false;
      }
      screenfull.toggle();
    },
    handleChange() {
      console.log('screenfull.handleChange', screenfull.isFullscreen);
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.handleChange);
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.handleChange);
      }
    }
  }
});
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  ;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
