// initial state
import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
export default {
  namespaced: true,
  getters: {
    getUser(state) {
      // 如果内存中有，则直接使用
      if (state.loginUser.id !== 0) {
        return state.loginUser;
      } else {
        // 否则，从 localStorage 中读取
        let localData: string = localStorage.getItem('loginUser') || JSON.stringify(state.loginUser);
        state.loginUser = JSON.parse(localData);
        return state.loginUser;
      }

    }
  },
  state: () => ({
    loginUser: {
      id: 0,
      role: ACCESS_ENUM.NOT_LOGIN_ROLE,
      username: "",
      token: "",
      audit: false
    },
  }),
  // 异步操作在action中进行，再传递到mutation
  actions: {
    saveLoginUser(context, user) {
      return new Promise((resolve, reject) => {
        if (user.id <= 0) {
          reject("user.id <= 0")
        } else if (user.token == "") {
          reject("user.token == \"\"")
        }
        else {
          context.commit('updateUser', user)
          resolve('ok')
        }
      })
    },
    clearLoginUser(context) {
      return new Promise((resolve, reject) => {
        context.commit('clearUser')
        resolve('ok')
      })
    }
  },
  // 同步操作在   mutations 中
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
      localStorage.setItem('loginUser', JSON.stringify(payload));
    },
    clearUser(state) {
      localStorage.removeItem('loginUser');
      state.loginUser = {
        id: 0,
        role: ACCESS_ENUM.NOT_LOGIN_ROLE,
        username: "",
        token: ""
      };
    }
  },
} as StoreOptions<any>;
