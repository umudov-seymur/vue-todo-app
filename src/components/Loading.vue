<template>
  <div>
    <img
      src="/loading.jpg"
      alt="loading"
      width="50"
      v-if="$store.state.loading"
    />
    <slot v-else></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
