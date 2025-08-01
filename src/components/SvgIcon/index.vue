<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="eventHandlers" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="eventHandlers">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://vue3-element-admin-site.midfar.com/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.iconClass);
    },
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className;
      } else {
        return 'svg-icon';
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      };
    },
    eventHandlers() {
      const events = {};
      for (const key in this.$attrs) {
        if (key.startsWith('on') && typeof this.$attrs[key] === 'function') {
          events[key] = this.$attrs[key];
        }
      }
      return events;
    }
  }
});
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
