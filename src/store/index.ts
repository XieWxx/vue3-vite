import { useUserStore } from '@/store/userStore'
// 统一导出useStore方法
export default function useStore() {
  return {
    user: useUserStore()
  }
}
