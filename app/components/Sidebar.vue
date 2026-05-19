<template>
  <USidebar
    v-model:open="isOpen"
    collapsible="icon"
    rail
    :ui="{
      container: 'h-full',
      inner: 'bg-elevated/25 divide-transparent',
      body: 'py-0',
    }"
  >
    <template #header>
      <UDropdownMenu :items="teamsItems" :content="{ align: 'start', collisionPadding: 12 }" :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-48' }">
        <UButton
          v-bind="selectedTeam"
          trailing-icon="i-lucide-chevrons-up-down"
          color="neutral"
          variant="ghost"
          square
          class="w-full data-[state=open]:bg-elevated overflow-hidden"
          :ui="{
            trailingIcon: 'text-dimmed ms-auto',
          }"
        />
      </UDropdownMenu>
    </template>

    <template #default="{ state }">
      <UNavigationMenu :key="state" :items="getItems(state)" orientation="vertical" :ui="{ link: 'p-1.5 overflow-hidden' }" />
    </template>
  </USidebar>
</template>

<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui';

const colorMode = useColorMode();
const isOpen = useSideNavState();
const blogStore = useBlogStore();

await blogStore.fetchAuthors();

const teams = ref([
  {
    label: 'Nuxt',
    avatar: {
      src: 'https://github.com/nuxt.png',
      alt: 'Nuxt',
    },
  },
  {
    label: 'Vue',
    avatar: {
      src: 'https://github.com/vuejs.png',
      alt: 'Vue',
    },
  },
  {
    label: 'UnJS',
    avatar: {
      src: 'https://github.com/unjs.png',
      alt: 'UnJS',
    },
  },
]);
const selectedTeam = ref(teams.value[0]);

const teamsItems = computed<DropdownMenuItem[][]>(() => {
  return [
    teams.value.map((team, index) => ({
      ...team,
      kbds: ['meta', String(index + 1)],
      onSelect() {
        selectedTeam.value = team;
      },
    })),
    [
      {
        label: 'Create team',
        icon: 'i-lucide-circle-plus',
      },
    ],
  ];
});

function getItems(state: 'collapsed' | 'expanded') {
  return [
    {
      label: 'Activity',
      icon: 'i-lucide-square-activity',
    },
    {
      label: 'Settings',
      icon: 'i-lucide-settings',
      defaultOpen: true,
      children:
        state === 'expanded'
          ? [
              {
                label: 'General',
                icon: 'i-lucide-house',
              },
              {
                label: 'Team',
                icon: 'i-lucide-users',
              },
              {
                label: 'Billing',
                icon: 'i-lucide-credit-card',
              },
            ]
          : [],
    },
  ] satisfies NavigationMenuItem[];
}

defineShortcuts(extractShortcuts(teamsItems.value));
</script>
