import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userName: '',
      passWord: '',
      token: '',
      userInfo: {}
    }
  },
  getters: {},
  actions: {
    setUser(user: any) {
      this.userName = user.userName
      this.passWord = user.passWord
      this.userInfo = user
      sessionStorage.setItem('userName', user.userName)
      sessionStorage.setItem('passWord', user.passWord)
      sessionStorage.setItem('userInfo', JSON.stringify(user))
    },
    setToken(token: any) {
      this.token = token
      sessionStorage.setItem(token.tokenName, token.tokenValue)
    }
  }
})
