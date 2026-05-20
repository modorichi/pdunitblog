<template>
  <div class="flex-1 flex flex-col">
    <div class="h-(--ui-header-height) shrink-0 flex items-center gap-3 px-4 border-b border-default">
      <UButton icon="i-lucide-panel-left" color="neutral" variant="ghost" aria-label="Toggle sidebar" @click="isOpen = !isOpen" />

      <form class="ml-auto flex w-full max-w-md items-center gap-2" role="search" @submit.prevent="submitSearch">
        <UInput v-model="searchKeyword" icon="i-lucide-search" placeholder="サイト内検索" aria-label="サイト内検索" class="min-w-0 flex-1" />
        <UButton type="submit" icon="i-lucide-search" color="primary" aria-label="検索" />
      </form>
    </div>

    <div class="flex-1 p-4">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const isOpen = useSideNavState();
const route = useRoute();

const searchKeyword = ref('');

watch(
  () => route.params.q,
  (q) => {
    searchKeyword.value = Array.isArray(q) ? (q[0] ?? '') : String(q ?? '');
  },
  { immediate: true },
);

async function submitSearch() {
  const q = searchKeyword.value.trim();

  if (!q) {
    await navigateTo('/blogs');
    return;
  }

  await navigateTo(`/search/${encodeURIComponent(q)}`);
}
</script>
