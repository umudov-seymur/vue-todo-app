<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="todo.completed" @change="doneEdit" />
      <span
        style="margin-left:5px;"
        v-if="!editing"
        @dblclick="editing = true"
        :class="{ completed: todo.completed }"
      >
        {{ title }}
      </span>
      <input
        type="text"
        class="todo-edit-input"
        v-model="newTitle"
        v-focus
        v-else
        @blur="
          editing = false;
          newTitle = todo.title;
        "
        @keyup.esc="
          editing = false;
          newTitle = todo.title;
        "
        @keyup.enter="doneEdit"
      />
    </div>
    <div>
      <button class="btn-pluralize" @click="pluralize">
        Pluralize
      </button>
      <span class="remove-item" @click="removeTodo(id)">&times;</span>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
import Mixin from "@/mixins/index";

export default {
  mixins: [Mixin],
  props: {
    todo: {
      type: Object,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      newTitle: this.todo.title,
      ...this.todo,
    };
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed;
    },
  },
  methods: {
    doneEdit() {
      this.checkTodoInput(this.newTitle)
        .then((title) => {
          this.editing = false;
          this.title = title;

          EventBus.$emit("updatedItem", {
            todo: this.$data,
          });
        })
        .catch((err) => alert(err));
    },
    pluralize() {
      if (this.title.slice(-1) !== "s") {
        this.newTitle = this.title += "'s";
        this.doneEdit();
      }
    },
    removeTodo(id) {
      EventBus.$emit("removedTodo", id);
    },
  },
};
</script>

<style lang="scss">
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
</style>

<style lang="scss">
@import url("https://cdn.jsdelivr.net/npm/animate.css@3.5.1");

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
