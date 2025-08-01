<template>
  <div class="app-container">
    <el-card class="box-card">
      <template #header>
        <a class="link-type link-title" target="_blank" href="https://vue3-element-admin-site.midfar.com/guide/advanced/theme.html">
          Theme documentation
        </a>
      </template>
      <div class="box-item">
        <span class="field-label">Change Theme : </span>
        <el-switch v-model="theme" />
        <aside style="margin-top:15px;">
          Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.
        </aside>
      </div>
    </el-card>

    <div class="block">
      <el-button type="primary">
        Primary
      </el-button>
      <el-button type="success">
        Success
      </el-button>
      <el-button type="info">
        Info
      </el-button>
      <el-button type="warning">
        Warning
      </el-button>
      <el-button type="danger">
        Danger
      </el-button>
    </div>

    <div class="block">
      <el-button type="primary" :icon="IconEdit" />
      <el-button type="primary" :icon="IconShare" />
      <el-button type="primary" :icon="IconDelete" />
      <el-button type="primary" :icon="IconSearch">
        Search
      </el-button>
      <el-button type="primary">
        Upload <el-icon><icon-upload /></el-icon>
      </el-button>
    </div>

    <div class="block">
      <el-tag v-for="tag in tags" :key="tag.type" :type="tag.type" class="tag-item">
        {{ tag.name }}
      </el-tag>
    </div>

    <div class="block">
      <el-radio-group v-model="radio">
        <el-radio :value="3">
          Option A
        </el-radio>
        <el-radio :value="6">
          Option B
        </el-radio>
        <el-radio :value="9">
          Option C
        </el-radio>
      </el-radio-group>
    </div>

    <div class="block">
      <el-slider v-model="slideValue" />
    </div>
  </div>
</template>

<script>
import { defineComponent, markRaw } from 'vue';
import {
  Edit as IconEdit,
  Share as IconShare,
  Delete as IconDelete,
  Search as IconSearch,
  Upload as IconUpload
} from '@element-plus/icons-vue';

export default defineComponent({
  name: 'Theme',
  components: { IconUpload },
  data() {
    return {
      IconEdit: markRaw(IconEdit),
      IconShare: markRaw(IconShare),
      IconDelete: markRaw(IconDelete),
      IconSearch: markRaw(IconSearch),
      theme: false,
      tags: [
        { name: 'Tag One', type: 'primary' },
        { name: 'Tag Two', type: 'info' },
        { name: 'Tag Three', type: 'success' },
        { name: 'Tag Four', type: 'warning' },
        { name: 'Tag Five', type: 'danger' }
      ],
      slideValue: 50,
      radio: 3
    };
  },
  watch: {
    theme() {
      console.log('watch theme', this.theme);
      // toggleClass(document.body, 'custom-theme');
      const htmlTag = document.querySelector('html');
      if (this.theme) {
        htmlTag.classList.add('dark');
      } else {
        htmlTag.classList.remove('dark');
      }
    }
  }
});
</script>

<style scoped>
.field-label{
  vertical-align: middle;
}
.box-card {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}

.block {
  padding: 30px 24px;
}

.tag-item {
  margin-right: 15px;
}
</style>
