<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === 'dark');
const icon = computed(() => (isDark.value ? 'i-lucide-sun' : 'i-lucide-moon'));
const label = computed(() => (isDark.value ? 'ライトモードに切り替え' : 'ダークモードに切り替え'));

function toggleColorMode() {
  colorMode.preference = isDark.value ? 'light' : 'dark';
}
</script>

<template>
  <UTooltip :text="label">
    <UButton :icon="icon" color="neutral" variant="ghost" :aria-label="label" @click="toggleColorMode" />
  </UTooltip>
</template>
