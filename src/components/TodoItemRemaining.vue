<template>
  <span>{{ remaining }} items left</span>
</template>

<script>
export default {
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    },
  },
};
</script>
