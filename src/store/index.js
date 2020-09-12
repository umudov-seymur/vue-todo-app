import Vue from "vue";
import Vuex from "vuex";

// vuex modules
import todos from "./modules/todos";
import auth from "./modules/auth";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    todos,
    auth,
  },
});
