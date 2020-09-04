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
export default {
  name: "TodoAdd",
  data() {
    return {
      todoText: "",
    };
  },
  methods: {
    addTodo() {
      this.$store
        .dispatch("addTodo", {
          title: this.todoText,
          editing: false,
        })
        .then(() => (this.todoText = ""))
        .catch((err) => alert(err.response.data.errors["title"][0]));
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
