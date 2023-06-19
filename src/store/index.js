import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    token: "",
    userInfo: "",
  },
  getters: {
    token: (state) => state.token,
    userInfo: (state) => state.userInfo,
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_USERINFO(state, payload) {
      state.userInfo = payload;
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
