// initial state
import { StoreOptions } from "vuex";
export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      id: 0
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // 从远程请求获取登录信息
     
    },
    logoutUser({ commit, state }, payload){
      commit("updateUser", {
        username: "未登录",
      });
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
