import todos from "@/api/todos";

export default {
  namespaced: true,
  state: {
    activeTab: "all",
    loading: false,
    todos: [],
    meta: {},
  },
  getters: {
    todosFiltered: (state) => {
      if (state.activeTab === "all") {
        return state.todos;
      } else if (state.activeTab === "active") {
        return state.todos.filter((todo) => !todo.confirmed);
      }
      return state.todos;
    },
    showClearBtn: (state) => {
      return state.todos.filter((todo) => todo.confirmed).length > 0;
    },
    remaining: (state) => {
      return state.todos.filter((todo) => !todo.confirmed).length;
    },
    anyRemaining: (state, getters) => {
      return getters.remaining === 0;
    },
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_TODO(state, todo) {
      state.todos.unshift(todo);
    },
    SET_META(state, pagination_data) {
      state.meta = pagination_data;
    },
    UPDATE_TODO(state, data) {
      const index = state.todos.findIndex((todo) => todo.id === data.id);
      state.todos.splice(index, 1, data);
    },
    DELETE_TODO(state, id) {
      const index = state.todos.findIndex((todo) => todo.id === id);
      state.todos.splice(index, 1);
    },
    SET_ALL_CHECKED(state, checked) {
      state.todos.forEach((todo) => (todo.confirmed = checked));
    },
    SET_ACTIVE_TAB(state, tab) {
      state.activeTab = tab;
    },
    RESET_TODOS_STATE(state) {
      state.activeTab = "all";
      state.loading = true;
      state.todos = [];
      state.meta = {};
    },
    clearedTodos(state) {
      state.todos = state.todos.filter((todo) => !todo.confirmed);
    },
  },
  actions: {
    retrieveTodos({ commit }, page = 1) {
      commit("SET_LOADING", true);
      todos.getAllTodos(page).then(({ data }) => {
        commit("SET_TODOS", data.data);
        commit("SET_META", { ...data.meta });
        commit("SET_LOADING", false);
      });
    },
    addTodo({ commit, dispatch }, todo) {
      commit("SET_LOADING", true);
      return todos.storeTodo(todo).then(() => {
        dispatch("retrieveTodos");
      });
    },
    updateTodo({ commit }, todo) {
      return todos
        .updateTodo(todo)
        .then((res) => commit("UPDATE_TODO", res.data));
    },
    removeTodo({ commit, dispatch }, id) {
      todos.removoTodo(id).then(() => {
        commit("DELETE_TODO", id);
        dispatch("retrieveTodos");
      });
    },
    checkAll({ commit, state }, checked) {
      commit("SET_ALL_CHECKED", checked);

      const ids = state.todos
        .filter((todo) => todo.confirmed === checked)
        .map((todo) => todo.id);

      todos.updateCheckAll({
        ids,
        checked,
      });
    },
    clearedTodos({ state, dispatch }) {
      const ids = state.todos
        .filter((todo) => todo.confirmed == true)
        .map((todo) => todo.id);
      todos.destroyCompleted(ids).then(() => {
        alert("Completed todos destroyed!");
        dispatch("retrieveTodos");
      });
    },
    changeTab({ commit }, tab) {
      commit("SET_ACTIVE_TAB", tab);
    },
  },
};
