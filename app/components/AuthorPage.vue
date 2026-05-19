<template>
  <main>
    <h1 class="text-2xl font-bold">{{ pageTitle }}</h1>
    <Items :blogs="blogStore.blogs" />
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const blogStore = useBlogStore();

await blogStore.fetchBlogsByAuthor(route.params.id as string);

const authorName = computed(() => blogStore.blogs.find((blog) => blog.author?.id === route.params.id)?.author?.name);
const pageTitle = computed(() => (authorName.value ? `${authorName.value}の記事一覧` : '作成者の記事一覧'));
</script>
