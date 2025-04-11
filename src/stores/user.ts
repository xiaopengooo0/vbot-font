
import { defineStore } from "pinia";


export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userInfo: {},
      token: "",
    };
  },
  actions: {
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
    setToken(token: string) {
      this.token = token;
    },
  },
  getters: {
    getUserInfo: (state) => {
      return state.userInfo;
    },
    getToken: (state) => {
      return state.token;
    },
  },
});