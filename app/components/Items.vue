<template>
  <ul class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <Item v-for="blog in blogs" :key="blog.id" :blog="blog" />
  </ul>
</template>

<script setup lang="ts">
import type { Blog } from '~/types/blog';

defineProps<{
  blogs: Blog[];
}>();
</script>
