// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
export default ({ mode }) => {
  // 在启动项目时，控制台打印环境。只是给自己看当前属于什么环境和BASE_URL
  console.log(mode)
  const BASE_URL = loadEnv(mode, process.cwd()).VITE_BASE_URL
  console.log(BASE_URL)
  return defineConfig({
    // base: './',
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue'],
        dts: 'src/utils/auto-imports.d.ts'
      })
    ],
    // 配置别名
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      port: 8888,
      proxy: {
        '/api': {
          target: 'http://localhost:3000/', //跨域地址
          changeOrigin: true, //支持跨域
          rewrite: path => path.replace(/^\/api/, '') //重写路径,替换/api
        }
      }
    }
  })
}
