<template>
  <main>
    <h1 class="text-2xl font-bold">{{ pageTitle }}</h1>
    <Items :blogs="blogStore.blogs" />
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const blogStore = useBlogStore();

const keyword = computed(() => String(route.params.q ?? ''));
const pageTitle = computed(() => (keyword.value ? `「${keyword.value}」の検索結果` : '検索結果'));

await blogStore.searchBlogs(keyword.value);
</script>
