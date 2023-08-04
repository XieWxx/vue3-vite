import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createPinia } from "pinia";
import http from "@/http/http";
import moment from "moment";
// 清除默认样式
import "reset-css";
// 动画库
import "animate.css";
// element-ui
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// Pinia
const pinia = createPinia();

const app = createApp(App);
// 全局挂载moment
app.config.globalProperties.$moment = moment;
// 全局挂载http
app.config.globalProperties.$http = http;

app.use(pinia).use(ElementPlus).use(store).use(router).mount("#app");
