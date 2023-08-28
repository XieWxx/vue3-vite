// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import tailwindcss from 'tailwindcss'
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
      }),
      tailwindcss
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
        '/api/v1': {
          // target: 'http://127.0.0.1:8118/',
          // target: 'http://192.168.168.41:2379/csp.store/',
          // target: "http://192.168.168.204:8118/",
          // target: 'http://192.168.168.206:8118/', //喻
          // target: "https://www.itcodeman.cn/",
          // target: 'http://pd.feelingtech.net:10070/',
          // target: 'http://192.168.1.113:8118/',
          // target: 'http://192.168.168.136:8118/',
          target: 'http://192.168.168.57:8888/', // 内网线上
          // target: 'https://www.fastmock.site/mock/5eae0ecb5b89ca0a2471919c4f58264b/api',
          changeOrigin: true //支持跨域
          // rewrite: path => path.replace(/^\/api/, '') //重写路径,替换/api
        }
      }
    }
  })
}
