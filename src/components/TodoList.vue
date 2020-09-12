<template>
  <div>
    <!-- ############ NEW TODO ############ -->
    <TodoAdd />
    <!-- ############ TODO LIST ############ -->
    <Loading>
      <div v-if="todosFiltered.length > 0">
        <div class="todo-list">
          <transition-group
            name="fade"
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown"
          >
            <TodoItem
              v-for="todo in todosFiltered"
              :todo="todo"
              :key="todo.id"
            />
          </transition-group>
        </div>
        <!-- ############ TODO ACTION TABS ############ -->
        <div class="todo-tabs">
          <todo-check-all />
          <todo-item-remaining />
          <todo-tabs />
        </div>
      </div>
      <div v-else>
        Not found's todos!
        <hr />
      </div>
    </Loading>
    <paginate
      :page-count="pageCount"
      :click-handler="getTodosByPage"
      v-model="page"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
    >
    </paginate>
  </div>
</template>

<script>
import TodoCheckAll from "@/components/TodoCheckAll";
import TodoTabs from "@/components/TodoTabs";
import TodoItemRemaining from "@/components/TodoItemRemaining";
import TodoAdd from "@/components/TodoAdd";
import Loading from "@/components/shared/Loading";
import TodoItem from "@/components/TodoItem";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "TodoList",
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    pageCount() {
      const last_page = this.$store.state.todos.meta.last_page;
      return last_page ? last_page : 0;
    },
    ...mapGetters("todos", ["todosFiltered"]),
  },
  created() {
    this.retrieveTodos();
  },
  methods: {
    ...mapActions("todos", ["retrieveTodos"]),
    getTodosByPage(page) {
      this.page = page;
      this.retrieveTodos(page);
    },
  },
  components: {
    TodoAdd,
    TodoItem,
    TodoItemRemaining,
    TodoCheckAll,
    Loading,
    TodoTabs,
  },
};
</script>

<style lang="scss">
.todo-list {
  display: flex;
  flex-direction: column;
}
.pagination {
  display: flex;
  align-items: center;
  list-style-type: none;
  padding: 18px 0;
  border-top: 1px solid gray;
  outline: none;

  & li {
    &.active a {
      background-color: #4caf50;
      color: white;
      border: 1px solid #4caf50;
    }

    &:hover:not(.active) {
      background-color: #ddd;
    }

    & a {
      color: black;
      float: left;
      padding: 8px 16px;
      text-decoration: none;
      transition: background-color 0.3s;
      border: 1px solid #ddd;

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
