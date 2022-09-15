<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="wrap(route, Component)" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script>
import { defineComponent, h } from 'vue';
import store from '@/store';
import { wrapperMap } from '@/store/modules/tagsView';

export default defineComponent({
  name: 'AppMain',
  computed: {
    cachedViews() {
      return store.tagsView().cachedViews;
    }
  },
  methods: {
    // 为keep-alive里的component接收的组件包上一层自定义name的壳.
    wrap(route, component) {
      let wrapper;
      // 重点就是这里，这个组件的名字是完全可控的，
      // 只要自己写好逻辑，每次能找到对应的外壳组件就行，完全可以写成任何自己想要的名字.
      // 这就能配合 keep-alive 的 include 属性可控地操作缓存.
      const wrapperName = route.name;
      if (wrapperMap.has(wrapperName)) {
        wrapper = wrapperMap.get(wrapperName);
      } else {
        wrapper = {
          name: wrapperName,
          render() {
            return h('div', { className: 'vaf-page-wrapper' }, component);
          }
        };
        wrapperMap.set(wrapperName, wrapper);
      }
      return h(wrapper);
    }
  }
});
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
