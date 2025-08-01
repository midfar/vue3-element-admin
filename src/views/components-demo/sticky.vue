<template>
  <div>
    <sticky :z-index="10" class-name="sub-navbar">
      <el-dropdown class="button-width-dropdown" trigger="click">
        <el-button plain>
          Platform<el-icon><IconCaretBottom /></el-icon>
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

      <el-dropdown class="button-width-dropdown" trigger="click">
        <el-button plain>
          Link<el-icon><IconCaretBottom /></el-icon>
        </el-button>
        <template v-slot:dropdown>
          <el-dropdown-menu class="no-padding no-border" style="width:300px">
            <el-input v-model="url" placeholder="Please enter the content">
              <template v-slot:prepend>
                Url
              </template>
            </el-input>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="time-container">
        <el-date-picker v-model="time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Release time" />
      </div>

      <el-button style="margin-left: 10px;" type="success">
        publish
      </el-button>
    </sticky>

    <div class="components-container">
      <aside>
        Sticky header, When the page is scrolled to the preset position will be sticky on the top.
      </aside>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <sticky :sticky-top="200">
        <el-button type="primary"> placeholder</el-button>
      </sticky>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Sticky from '@/components/Sticky';
import { CaretBottom as IconCaretBottom } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'StickyDemo',
  components: { Sticky, IconCaretBottom },
  data() {
    return {
      time: '',
      url: '',
      platforms: ['a-platform'],
      platformsOptions: [
        { key: 'a-platform', name: 'platformA' },
        { key: 'b-platform', name: 'platformB' },
        { key: 'c-platform', name: 'platformC' }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  }
});
</script>

<style scoped>
.button-width-dropdown {
  margin-top: 10px;
  margin-right: 10px;
}
.components-container div {
  margin: 10px;
}

.time-container {
  display: inline-block;
}
</style>
