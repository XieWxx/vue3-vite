import Nprogress from "nprogress";
import axios from "axios";
import "nprogress/nprogress.css";
import { ElMessage } from "element-plus";

// 创建axios实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 6000, // 请求超时时间
});

const NEWWORK_ERROR = "网络请求异常，请稍后重试！";

request.interceptors.request.use(
  (config: any) => {
    Nprogress.start();
    const token = sessionStorage.getItem("token");
    config.headers["Authorization"] = token ? token : "";
    return config;
  },
  (errorHandler: any) => {
    Nprogress.done();
    return Promise.reject(errorHandler);
  }
);

request.interceptors.response.use((res: any) => {
  Nprogress.done();
  if (res.status === 200) {
    return res.data;
  } else {
    ElMessage.error(NEWWORK_ERROR);
    return Promise.reject(NEWWORK_ERROR);
  }
});

class Http {
  get = function (url: string, params: any) {
    return request({
      url: url,
      method: "get",
      headers: { "Content-Type": "multipart/form-data" },
      params,
    });
  };
  post = function (url: string, data: any) {
    return request({
      url: url,
      method: "post",
      data,
    });
  };
}
const http = new Http();
export { http };
