<template>
  <div>
    <input
      type="text"
      class="todo-input"
      v-model="todoText"
      @keyup.enter="addTodo"
      placeholder="What needs to be done"
    />
  </div>
</template>

<script>
import Mixin from "@/mixins/index";
export default {
  mixins: [Mixin],
  name: "TodoAdd",
  data() {
    return {
      todoText: "",
    };
  },
  watch: {
    todoText: function(value) {
      this.$emit("input", value);
    },
  },
  methods: {
    addTodo() {
      this.checkTodoInput(this.todoText)
        .then(() => {
          this.$emit("newTodos", {
            id: Math.floor(Math.random() * Math.floor(1000)),
            title: this.todoText,
            completed: false,
            editing: false,
          });
          this.todoText = "";
        })
        .catch((err) => alert(err));
    },
  },
};
</script>

<style lang="scss" scope>
.todo-input {
  width: 94%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
  border: 1px solid rgb(179, 179, 179);

  &:focus {
    outline: 0;
  }
}
</style>
