<template>
  <span>{{ remaining }} items left</span>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("todos", ["remaining"]),
  },
};
</script>
