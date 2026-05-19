<template>
  <Header />
  <UContainer>
    <div class="flex flex-1">
      <Sidebar />
      <Main>
        <slot />
      </Main>
    </div>
  </UContainer>
</template>

<style scoped></style>
