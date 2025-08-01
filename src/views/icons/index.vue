<template>
  <div class="icons-container">
    <aside>
      <a href="https://vue3-element-admin-site.midfar.com/guide/advanced/icon.html" target="_blank">Add and use
      </a>
    </aside>
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div class="grid">
          <div v-for="item of svgIcons" :key="item" @click="handleClipboard(generateIconCode(item), $event)">
            <el-tooltip placement="top">
              <template #content>
                {{ generateIconCode(item) }}
              </template>
              <div class="icon-item">
                <svg-icon :icon-class="item" class-name="disabled" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div class="grid">
          <div v-for="item of elementIcons" :key="item" @click="handleClipboard(generateElementIconCode(item), $event)">
            <el-tooltip placement="top">
              <template #content>
                {{ generateElementIconCode(item) }}
              </template>
              <div class="icon-item">
                <el-icon>
                  <!-- 必须添加以下两个class，否则复制功能，点击svg元素时有bug -->
                  <component :is="item" class="svg-icon disabled"></component>
                </el-icon>
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clipboard from '@/utils/clipboard';
import svgIcons from './svg-icons';
import ElementPlusIconsVue from './element-icons';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Icons',
  components: {
    ...ElementPlusIconsVue
  },
  data() {
    return {
      svgIcons,
      elementIcons: Object.keys(ElementPlusIconsVue)
    };
  },
  methods: {
    generateIconCode(symbol) {
      // console.log('generateIconCode symbol=', symbol);
      return `<svg-icon icon-class="${symbol}" />`;
    },
    generateElementIconCode(symbol) {
      // console.log('generateElementIconCode symbol=', symbol);
      return `<el-icon><${symbol} /></el-icon>`;
    },
    handleClipboard(text, event) {
      // console.log('handleClipboard', text, typeof text, event);
      clipboard(text, event);
    }
  }
});
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
