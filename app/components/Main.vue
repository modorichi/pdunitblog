<template>
  <div class="flex-1 flex flex-col">
    <div class="h-(--ui-header-height) shrink-0 flex items-center px-4 border-b border-default">
      <UButton icon="i-lucide-panel-left" color="neutral" variant="ghost" aria-label="Toggle sidebar" @click="isOpen = !isOpen" />
    </div>

    <div class="flex-1 p-4">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const isOpen = useSideNavState();
</script>
