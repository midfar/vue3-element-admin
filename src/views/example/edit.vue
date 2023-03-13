<template>
  <article-detail :is-edit="true" />
</template>

<script>
import { defineComponent } from 'vue';
import ArticleDetail from './components/ArticleDetail';

export default defineComponent({
  name: 'EditForm',
  components: { ArticleDetail }
});
</script>

