import auth from "@/api/auth";
import utils from "@/utils";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("access_token") || null,
    errors: [],
  },
  getters: {
    isLoggedIn(state) {
      return state.token !== null && state.token !== "";
    },
    AUTH_ERROR(state) {
      return state.errors;
    },
  },
  mutations: {
    SET_ACCESS_TOKEN(state, token) {
      state.token = token;
    },
    SET_ERRORS(state, errors) {
      state.errors = errors;
    },
    AUTH_LOGOUT(state) {
      state.token = "";
    },
  },
  actions: {
    AUTH_LOGIN({ state, commit }, credentials) {
      state.errors = [];
      return new Promise((resolve, reject) => {
        auth
          .login(credentials)
          .then((res) => {
            const { access_token } = res.data;
            localStorage.setItem("access_token", access_token);
            commit("SET_ACCESS_TOKEN", access_token);
            resolve(res);
          })
          .catch(({ response }) => {
            commit("SET_ERRORS", utils.parseError(response.data.errors));
            reject(response.data);
          });
      });
    },
    AUTH_REGISTER({ commit }, userData) {
      return new Promise((resolve, reject) => {
        auth
          .register(userData)
          .then((res) => resolve(res.data))
          .catch(({ response }) => {
            commit("SET_ERRORS", utils.parseError(response.data.errors));
            reject(response.data);
          });
      });
    },
    AUTH_LOGOUT: ({ commit }) => {
      return new Promise((resolve) => {
        auth.logout().then(() => {
          commit("AUTH_LOGOUT");
          localStorage.removeItem("access_token");
          resolve();
        });
      });
    },
  },
};
