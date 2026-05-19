<script setup lang="ts">
import type { Blog } from '~/types/blog';

defineProps<{
  blog: Blog;
}>();

function formatDate(date: string) {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
}
</script>

<template>
  <li>
    <UCard class="h-full overflow-hidden" :ui="{ body: 'p-0 sm:p-0', footer: 'p-4 sm:p-4' }">
      <NuxtLink :to="`/blogs/${blog.id}`" class="block">
        <img v-if="blog.eyecatch" :src="blog.eyecatch.url" :width="blog.eyecatch.width" :height="blog.eyecatch.height" :alt="blog.title" class="aspect-video w-full object-cover" />

        <div v-else class="aspect-video w-full bg-muted" />
      </NuxtLink>

      <template #footer>
        <div class="space-y-3">
          <time v-if="blog.publishedAt" :datetime="blog.publishedAt" class="block text-xs text-muted">
            {{ formatDate(blog.publishedAt) }}
          </time>

          <NuxtLink :to="`/blogs/${blog.id}`" class="block text-base font-semibold text-highlighted hover:text-primary">
            {{ blog.title }}
          </NuxtLink>

          <div class="flex flex-wrap items-center gap-2 text-sm text-muted">
            <UBadge v-if="blog.category" color="neutral" variant="soft">
              {{ blog.category.name }}
            </UBadge>

            <NuxtLink v-if="blog.author" :to="`/authors/${blog.author.id}`" class="hover:text-primary">
              {{ blog.author.name }}
            </NuxtLink>
          </div>

          <div v-if="blog.tags?.length" class="flex flex-wrap gap-2">
            <NuxtLink v-for="tag in blog.tags" :key="tag.id" :to="`/tags/${tag.id}`">
              <UBadge color="primary" variant="subtle">
                #{{ tag.name }}
              </UBadge>
            </NuxtLink>
          </div>
        </div>
      </template>
    </UCard>
  </li>
</template>
