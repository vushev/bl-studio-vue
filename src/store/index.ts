import { createStore } from "vuex";

const store = createStore({
  state: {
    token: localStorage.getItem("token") || null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem("token");
    }
  },
  actions: {
    login({ commit }, token) {
      // Set the token and isAuthenticated state
      commit("setToken", token);
      commit("setAuthenticated", true);
    },
    logout({ commit }) {
      // Clear the token and set isAuthenticated to false
      store.commit("clearToken");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    token: (state) => state.token,
  },
});

export default store;
