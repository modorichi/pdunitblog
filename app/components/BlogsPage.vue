<template>
  <main>
    <h1 class="text-2xl font-bold">記事一覧</h1>

    <nav class="mt-4 flex flex-wrap gap-2" aria-label="カテゴリー">
      <UButton to="/blogs" :variant="route.path === '/blogs' ? 'solid' : 'soft'" color="neutral" size="sm">すべて</UButton>

      <UButton v-for="category in blogStore.categories" :key="category.id" :to="`/categories/${category.id}`" :variant="route.params.id === category.id ? 'solid' : 'soft'" color="neutral" size="sm">
        {{ category.name }}
      </UButton>
    </nav>

    <Items :blogs="blogStore.blogs" />
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const blogStore = useBlogStore();

await blogStore.fetchBlogs();
await blogStore.fetchCategories();

console.log('blogStore.categories' + JSON.stringify(blogStore.categories));
</script>
