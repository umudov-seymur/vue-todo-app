<template>
  <div class="tab-buttons">
    <button
      v-for="(action, index) in ['all', 'active']"
      @click="changeTab(action)"
      :class="{ active: filter === action }"
      :key="index"
    >
      {{ action | capitalize }}
    </button>
    <button @click="clearedTodos" v-if="showClearBtn">
      Clear completed
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    filter() {
      return this.$store.state.todos.activeTab;
    },
    ...mapGetters("todos", ["showClearBtn"]),
  },
  methods: {
    ...mapActions("todos", ["changeTab", "clearedTodos"]),
  },
};
</script>

<style lang="scss">
.todo-tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0 8px 0;

  input {
    margin-right: 12px;
  }

  & > span {
    color: rgb(112, 112, 112);
  }

  button {
    margin-left: 8px;
    background: rgb(21, 89, 179);
    border: none;
    color: white;
    padding: 6px 12px;
    transition: all 0.2s;
    border-radius: 2px;

    &:hover {
      cursor: pointer;
      background: rgb(12, 61, 126);
    }

    &.active {
      background: rgb(0, 42, 134);
    }
  }
}
</style>
