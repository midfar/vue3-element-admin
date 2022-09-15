<script>
import { defineComponent, h } from 'vue';

export default defineComponent({
  created() {
    // console.log('redirect', this.$route);
    const { params, query } = this.$route;
    const { path } = params;
    this.$router.replace({ path: '/' + path, query });
  },
  render() {
    return h('div'); // avoid warning message
  }
});
</script>
