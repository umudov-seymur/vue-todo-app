<template>
  <button type="submit" :disabled="loading">
    <i class="fa fa-spinner fa-spin" v-if="loading"></i> <slot />
  </button>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
