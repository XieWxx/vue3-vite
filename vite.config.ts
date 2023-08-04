// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
export default (({ mode }) => {

  // 在启动项目时，控制台打印环境。只是给自己看当前属于什么环境和BASE_URL
  console.log(mode)
  const BASE_URL = loadEnv(mode, process.cwd()).VITE_BASE_URL
  console.log(BASE_URL)
  return defineConfig({
    // base: './',
    plugins: [vue()],
    // 配置别名
    resolve: {
      alias: {
        "@": resolve(__dirname, './src')
      }
    }
  })
})

