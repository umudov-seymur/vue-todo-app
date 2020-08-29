<template>
  <span>{{ remaining }} items left</span>
</template>

<script>
export default {
  props: {
    remaining: {
      type: Number,
    },
  },
};
</script>
