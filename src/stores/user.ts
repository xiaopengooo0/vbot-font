
import { defineStore } from "pinia";


interface UserInfo {
    id: string;
    username: string;
    nickname: string;
    avatar: string;
    email: string;
    phone: string;
}


export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userInfo: {},
      token: "",
      roles: [],
      permissions: []
    };
  },
  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },
    setToken(token: string) {
      this.token = token;
    },
    setPermissions(permissions: []) {
      this.permissions = permissions;
    },
    setRoles(roles: []) {
      this.roles = roles;
    },
  },
  getters: {
    getUserInfo: (state) => {
      return state.userInfo;
    },
    getToken: (state) => {
      return state.token;
    },
    getPermissions: (state) => {
      return state.permissions;
    },
    getRoles: (state) => {
      return state.roles;
    },
  },
});

