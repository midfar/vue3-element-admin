<template>
  <article-detail :is-edit="false" />
</template>

<script>
import { defineComponent } from 'vue';
import ArticleDetail from './components/ArticleDetail';

export default defineComponent({
  name: 'CreateArticle',
  components: { ArticleDetail }
});
</script>

