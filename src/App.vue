<template>
  <div
    id="todo-app"
    class="container"
    @keyup.ctrl.65="$store.dispatch('todos/checkAll', true)"
  >
    <img
      alt="Vue logo"
      src="./assets/logo.png"
      style="width:120px;"
      @contextmenu.prevent
    />
    <h2>Vue js - Todo App with Laravel Api</h2>
    <TodoList />
  </div>
</template>

<script>
import TodoList from "@/components/TodoList";

export default {
  name: "App",
  components: {
    TodoList,
  },
};
</script>

<style>
#todo-app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  overflow: hidden;
  font-size: 16px;
}
</style>
