<template>
  <TagsPage />
</template>

<script setup lang="ts">
const route = useRoute();
const blogStore = useBlogStore();

await blogStore.fetchBlogsByTag(route.params.id as string);
</script>
