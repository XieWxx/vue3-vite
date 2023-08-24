import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createPinia } from 'pinia'
// import http from '@/http/axios'
import moment from 'moment'
import lodash from 'lodash'
// 清除默认样式
import 'reset-css'
// 动画库
import 'animate.css'
// element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import mitt from 'mitt'
// Pinia
const pinia = createPinia()
// EvenetBus
const Mit = mitt()

const app = createApp(App)
// 全局挂载moment
app.config.globalProperties.$moment = moment
// 全局挂载http
// app.config.globalProperties.$http = http
// 全局挂载lodash
app.config.globalProperties.$lodash = lodash
// 全局挂载EventBus
app.config.globalProperties.$Bus = Mit

app.use(pinia).use(ElementPlus).use(store).use(router).mount('#app')
