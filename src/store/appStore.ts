import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      // 重复提交token
      _ReSub_Token: '6709be1e490a4973abd98a2c4594776f1692777243717',
      // 操作是否需要复核
      modelOpen: true,
      // 交易流水号
      jnlNo: ''
    }
  },
  getters: {},
  actions: {
    // 修改是否需要复核的标志
    SET_TASKFLAG(flag: boolean) {
      this.modelOpen = flag
    },
    // 设置交易流水号
    SET_JNL_NO(jnlNo: string) {
      this.jnlNo = jnlNo
    }
  }
})
