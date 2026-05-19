<template>
  <main v-if="blog" class="mx-auto max-w-4xl">
    <UBreadcrumb :items="items" class="mb-4" />
    <article class="space-y-8">
      <UCard>
        <div class="space-y-5">
          <div class="flex flex-wrap items-center gap-3 text-sm text-muted">
            <time v-if="blog.publishedAt" :datetime="blog.publishedAt">
              {{ formatDate(blog.publishedAt) }}
            </time>

            <UBadge v-if="blog.category" color="neutral" variant="soft" :to="`/categories/${blog.category.id}`">
              {{ blog.category.name }}
            </UBadge>
          </div>

          <h1 class="text-3xl font-bold tracking-tight text-highlighted sm:text-4xl">
            {{ blog.title }}
          </h1>

          <div class="flex flex-wrap items-center gap-6">
            <UButton v-if="blog.author" :to="`/authors/${blog.author.id}`" color="neutral" variant="ghost" size="sm" class="px-0 leading-none">
              <UAvatar :src="blog.author.image?.url" :alt="blog.author.name" size="xl" loading="lazy" />
              {{ blog.author.name }}
            </UButton>
          </div>

          <div v-if="blog.tags?.length" class="flex flex-wrap gap-2">
            <UBadge v-for="tag in blog.tags" :key="tag.id" color="primary" variant="subtle" :to="`/tags/${tag.id}`">#{{ tag.name }}</UBadge>
          </div>
        </div>
      </UCard>

      <UCard>
        <div ref="contentRef" class="article-body" v-html="blog.body" />
      </UCard>
    </article>
  </main>
</template>

<script setup lang="ts">
import hljs from 'highlight.js';
import type { BreadcrumbItem } from '@nuxt/ui';

const items = ref<BreadcrumbItem[]>([
  {
    label: 'Blog',
    icon: 'i-lucide-box',
    to: '/blogs/',
  },
  {
    label: 'Blog Detail',
  },
]);

const route = useRoute();
const blogStore = useBlogStore();

await blogStore.fetchBlogById(route.params.id as string);

const contentRef = ref<HTMLElement | null>(null);
const blog = computed(() => blogStore.selectedBlog);

function formatDate(date: string) {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
}

onMounted(() => {
  contentRef.value?.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightElement(block as HTMLElement);
  });
});
</script>

<style scoped>
.article-body {
  color: var(--ui-text);
  line-height: 1.9;
}

.article-body :deep(*) {
  overflow-wrap: anywhere;
}

.article-body :deep(h2) {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--ui-border);
  padding-bottom: 0.5rem;
  color: var(--ui-text-highlighted);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
}

.article-body :deep(h3) {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: var(--ui-text-highlighted);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
}

.article-body :deep(p),
.article-body :deep(ul),
.article-body :deep(ol),
.article-body :deep(blockquote),
.article-body :deep(pre) {
  margin-top: 1rem;
}

.article-body :deep(ul),
.article-body :deep(ol) {
  padding-left: 1.5rem;
}

.article-body :deep(ul) {
  list-style: disc;
}

.article-body :deep(ol) {
  list-style: decimal;
}

.article-body :deep(a) {
  color: var(--ui-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.article-body :deep(blockquote) {
  border-left: 4px solid var(--ui-primary);
  padding-left: 1rem;
  color: var(--ui-text-muted);
}

.article-body :deep(pre) {
  overflow-x: auto;
  border-radius: var(--ui-radius);
  padding: 1rem;
}

.article-body :deep(:not(pre) > code) {
  border-radius: 0.375rem;
  background: var(--ui-bg-elevated);
  padding: 0.125rem 0.375rem;
  color: var(--ui-text-highlighted);
  font-size: 0.875em;
}

.article-body :deep(img) {
  margin-top: 1.5rem;
  border-radius: var(--ui-radius);
}
</style>
