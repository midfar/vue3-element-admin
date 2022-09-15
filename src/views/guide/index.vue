<template>
  <div class="app-container">
    <aside>
      The guide page is useful for some people who entered the project for the first time. You can briefly introduce the
      features of the project. Demo is based on
      <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js.</a>
    </aside>
    <el-button :icon="QuestionFilled" type="primary" @click.prevent.stop="guide">
      Show Guide
    </el-button>
  </div>
</template>

<script>
import Driver from 'driver.js'; // import driver.js
import 'driver.js/dist/driver.min.css'; // import driver.js css
import { defineComponent, markRaw } from 'vue';
import steps from './steps';
import { QuestionFilled } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'Guide',
  data() {
    return {
      QuestionFilled: markRaw(QuestionFilled),
      driver: null
    };
  },
  mounted() {
    this.driver = new Driver();
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps);
      this.driver.start();
    }
  }
});
</script>
