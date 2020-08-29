<template>
  <div class="tab-buttons">
    <button
      v-for="(action, index) in ['all', 'active', 'clear completed']"
      @click="changeTab(action)"
      v-show="action == 'clear completed' ? showClearBtn : action"
      :class="{ active: filter === action }"
      :key="index"
    >
      {{ action | capitalize }}
    </button>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";

export default {
  props: {
    showClearBtn: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      filter: "all",
    };
  },
  methods: {
    changeTab(action) {
      this.filter = action;
      EventBus.$emit("filterChanged", action);
    },
  },
};
</script>

<style lang="scss" scoped></style>
