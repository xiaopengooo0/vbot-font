
import { defineStore } from "pinia";


export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userInfo: {},
      token: "",
      permission: []
    };
  },
  actions: {
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
    setToken(token: string) {
      this.token = token;
    },
    setPermission(permission: any) {
      this.permission = permission;
    },
  },
  getters: {
    getUserInfo: (state) => {
      return state.userInfo;
    },
    getToken: (state) => {
      return state.token;
    },
    getPermission: (state) => {
      return state.permission;
    },
  },
});