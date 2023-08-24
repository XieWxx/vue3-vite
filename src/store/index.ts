import { useUserStore } from '@/store/userStore'
import { useAppStore } from "@/store/appStore"
// 统一导出useStore方法
export default function useStore() {
  return {
    user: useUserStore(),
    app: useAppStore()
  }
}
