import { createStore } from "vuex";
import http from "../services/api";

const store = createStore({
  state: {
    token: null,
    isAuthenticated: false,
  },
  mutations: {
    setAuthenticated(state, status) {
      state.isAuthenticated = status;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await http.post("/auth/signin", credentials);
        if (response.status === 200) {
          commit("setAuthenticated", true);
        }
      } catch (error) {
        console.error("Failed to login", error);
      }
    },
    async logout({ commit }) {
      try {
        const response = await http.post("/auth/signout");
        if (response.status === 200) {
          commit("setAuthenticated", false);
        }
      } catch (error) {
        console.error("Failed to logout", error);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
});

export default store;
