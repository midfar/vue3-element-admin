<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Chart from '@/components/Charts/Keyboard';

export default defineComponent({
  name: 'KeyboardChart',
  components: { Chart }
});
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

