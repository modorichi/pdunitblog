<template>
  <main>
    <h1 class="text-2xl font-bold">{{ pageTitle }}</h1>
    <Items :blogs="blogStore.blogs" />
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const blogStore = useBlogStore();

await blogStore.fetchBlogsByTag(route.params.id as string);

const tagName = computed(() => blogStore.blogs.flatMap((blog) => blog.tags ?? []).find((tag) => tag.id === route.params.id)?.name);
const pageTitle = computed(() => (tagName.value ? `#${tagName.value}の記事一覧` : 'タグの記事一覧'));
</script>
