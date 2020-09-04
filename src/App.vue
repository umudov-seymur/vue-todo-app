<template>
  <div id="app" class="container">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
      style="width:120px;"
      @contextmenu.prevent
    />
    <h2>Vue js - Todo App</h2>
    <hr />
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
body {
  background: rgba(253, 253, 253, 0.657);
}
.container {
  max-width: 700px;
  margin: 0 auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  overflow: hidden;
}
</style>
