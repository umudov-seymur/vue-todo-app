<template>
  <div>
    <input
      type="checkbox"
      id="check-all"
      :checked="is_checked"
      @change="checked_all"
    />
    <label for="check-all">Check All</label>
  </div>
</template>

<script>
export default {
  computed: {
    is_checked() {
      return this.$store.getters["todos/anyRemaining"];
    },
  },
  methods: {
    checked_all({ target }) {
      this.$store.dispatch("todos/checkAll", target.checked);
    },
  },
};
</script>
