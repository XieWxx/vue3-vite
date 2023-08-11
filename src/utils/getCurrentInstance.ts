import { getCurrentInstance, ComponentInternalInstance } from 'vue'
export default function useCurrentInstance() {
  const currentInstance = getCurrentInstance() as ComponentInternalInstance
  const proxy = currentInstance.appContext.config.globalProperties
  // 所有通过app.config.globalProperties挂载的，都在proxy中
  return proxy
}
