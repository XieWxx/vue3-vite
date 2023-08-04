import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      userName: "",
      passWord: "",
      token: "",
    };
  },
  getters: {},
  actions: {
    setUser(user: any) {
      this.userName = user.userName;
      this.passWord = user.passWord;
      sessionStorage.setItem("userName", user.userName);
      sessionStorage.setItem("passWord", user.passWord);
    },
    setToken(token: any) {
      this.token = token;
      sessionStorage.setItem(token.tokenName, token.tokenValue);
    },
  },
});
