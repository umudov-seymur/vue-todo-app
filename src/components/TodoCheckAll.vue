<template>
  <div>
    <input
      type="checkbox"
      id="check-all"
      :checked="!anyRemaining"
      @change="allChecked"
    />
    <label for="check-all">Check All</label>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";

export default {
  props: {
    anyRemaining: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    allChecked() {
      EventBus.$emit("checkAllChanged", this.anyRemaining);
    },
  },
};
</script>
