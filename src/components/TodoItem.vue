<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="todo.confirmed" @change="doneEdit" />
      <span
        style="margin-left:5px;"
        v-if="!todo.editing"
        @dblclick="todo.editing = true"
        :class="{ completed: todo.confirmed }"
      >
        {{ todo.title }}
      </span>
      <input
        type="text"
        class="todo-edit-input"
        v-model="newTitle"
        v-focus
        v-else
        @blur="
          todo.editing = false;
          newTitle = todo.title;
        "
        @keyup.esc="
          todo.editing = false;
          newTitle = todo.title;
        "
        @keyup.enter="doneEdit"
      />
    </div>
    <div>
      <button class="btn-pluralize" @click="pluralize">
        Pluralize
      </button>
      <span class="remove-item" @click="removeTodo(todo.id)">&times;</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newTitle: this.todo.title,
    };
  },
  methods: {
    doneEdit() {
      this.todo.title = this.newTitle;
      this.$store
        .dispatch("updateTodo", this.todo)
        .then(() => (this.todo.editing = false))
        .catch((err) => alert(err.response.data.errors["title"][0]));
    },
    pluralize() {
      if (this.newTitle.slice(-1) !== "s") {
        this.newTitle = this.newTitle += "'s";
        this.doneEdit();
      }
    },
    ...mapActions(["removeTodo"]),
  },
};
</script>

<style lang="scss">
@import url("https://cdn.jsdelivr.net/npm/animate.css@3.5.1");

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  text-align: left;
  animation-duration: 0.3s;
}

.todo-item:nth-child(even) {
  border-top: 1px solid rgb(177, 177, 177);
  border-bottom: 1px solid rgb(177, 177, 177);
  padding: 12px 0;
}

.todo-edit-input {
  padding: 5px 10px;
  font-size: 18px;
}

.remove-item {
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: rgb(0, 0, 0);
  }
}
.completed {
  text-decoration-line: line-through;
}
.btn-pluralize {
  border: 1px solid rgb(61, 61, 61);
  border-radius: 5px;
  margin-right: 8px;
  padding: 4px;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
