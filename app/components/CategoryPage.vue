<template>
  <main>
    <h1 class="text-2xl font-bold">{{ pageTitle }}</h1>
    <Items :blogs="blogStore.blogs" />
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const blogStore = useBlogStore();

await blogStore.fetchCategories();
await blogStore.fetchBlogsByCategory(route.params.id as string);
const categoryName = computed(() => blogStore.blogs.find((blog) => blog.category?.id === route.params.id)?.category?.name);
const pageTitle = computed(() => (categoryName.value ? `${categoryName.value}の記事一覧` : 'カテゴリの記事一覧'));
</script>
