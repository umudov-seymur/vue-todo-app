<template>
  <div>
    <!-- ############ NEW TODO ############ -->
    <TodoAdd @newTodos="addTodo" />
    <!-- ############ TODO LIST ############ -->
    <div class="todo-list" v-if="todos.length > 0">
      <TodoItem
        v-for="todo in filteredTodos"
        :todo="todo"
        :checkAll="!anyRemaining"
        :key="todo.id"
      />
    </div>
    <div v-else>
      Not found's todos!
      <hr />
    </div>
    <!-- ############ TODO ACTION TABS ############ -->
    <div class="todo-tabs">
      <todo-check-all :anyRemaining="anyRemaining" />
      <todo-item-remaining :remaining="remaining" />
      <todo-tabs :showClearBtn="showClearBtn" />
    </div>
  </div>
</template>

<script>
import TodoCheckAll from "@/components/TodoCheckAll";
import TodoTabs from "@/components/TodoTabs";
import TodoItemRemaining from "@/components/TodoItemRemaining";
import TodoAdd from "@/components/TodoAdd";
import TodoItem from "@/components/TodoItem";
import { EventBus } from "@/event-bus";

export default {
  name: "TodoList",
  data() {
    return {
      activeTab: "all",
      todos: [
        {
          id: 1,
          title: "Finish Vue Screencast",
          completed: false,
          editing: false,
        },
        {
          id: 2,
          title: "Take over world",
          completed: false,
          editing: false,
        },
      ],
    };
  },
  created() {
    EventBus.$on("removedTodo", (id) => this.removeTodo(id));
    EventBus.$on("updatedItem", (todos) => this.updateTodo(todos));
    EventBus.$on("checkAllChanged", (checked) => this.checkAll(checked));
    EventBus.$on("filterChanged", (filter) => (this.activeTab = filter));
  },
  computed: {
    filteredTodos() {
      if (this.activeTab === "all") {
        return this.todos;
      } else if (this.activeTab === "active") {
        return this.todos.filter((todo) => !todo.completed);
      } else if (this.activeTab === "clear completed") {
        return this.clearedTodos();
      }
      return this.todos;
    },
    showClearBtn() {
      return this.todos.filter((todo) => todo.completed).length > 0;
    },
    remaining() {
      return this.todos.filter((todo) => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining !== 0;
    },
  },
  methods: {
    addTodo(newTodos) {
      this.todos.push(newTodos);
    },
    updateTodo(data) {
      const index = this.todos.findIndex((todo) => todo.id === data.todo.id);
      this.todos.splice(index, 1, data.todo);
    },
    removeTodo(id) {
      const index = this.todos.findIndex((todo) => todo.id === id);
      this.todos.splice(index, 1);
    },
    clearedTodos() {
      this.todos = this.todos.filter((todo) => !todo.completed);
      this.activeTab = "all";
      return this.todos;
    },
    checkAll(checked) {
      this.todos.forEach((todo) => (todo.completed = checked));
    },
  },
  components: {
    TodoAdd,
    TodoItem,
    TodoItemRemaining,
    TodoCheckAll,
    TodoTabs,
  },
};
</script>

<style lang="scss">
.todo-list {
  display: flex;
  flex-direction: column;
}
.todo-tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;

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
