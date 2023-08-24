import axios from 'axios'
import Nprogress from 'nprogress'
import Cookies from 'js-cookie'
import 'nprogress/nprogress.css'
import { storeToRefs } from 'pinia'
import { ElNotification } from 'element-plus'
import useStore from '@/store'
import { ACCESS_TOKEN } from '@/config/global'
import { isEmpty } from 'lodash'

const Store = useStore()

console.log('_resub_token', Store.app)

const codeMessage: any = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  600: '网络超时'
}
axios.defaults.withCredentials = true
axios.defaults.timeout = 30000
class HttpRequest {
  baseUrl: string = ''
  // messageInstance = null
  queue: any = {}
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }
  getInsideConfig() {
    return {
      baseURL: this.baseUrl,
      headers: {
        // 固定设置请求头
        //'Authorization': 'Bearer ' + 'token'
        // 'TOKEN': 'test',
      }
    }
  }
  destroy(url: string) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance: any, url: string) {
    Nprogress.start()
    instance.defaults.headers.common['X-GW-TIME'] = new Date().getTime()
    instance.defaults.headers.common['Authorization'] = Cookies.get(ACCESS_TOKEN)
    instance.defaults.headers.common['_ReSub_Token'] = Store.app._ReSub_Token
    // 请求拦截
    instance.interceptors.request.use(
      (config: any) => {
        // 动态设置请求
        // 添加全局的loading...
        this.queue[url] = true
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      (res: any) => {
        Nprogress.done()
        this.destroy(url)
        const { data, status, config } = res
        if (status === 200 && data.responseCode) {
          const code = data.responseCode.substring(data.responseCode.length - 6)
          // 原判断为parseInt(code) == '000000'
          if (code === '000000') {
            // 判断是否要复核
            if (data.responseBody.taskFlag) {
              // 判断是否是增加流程
              if (Store.app.modelOpen) {
                // 设置复核的标志
                Store.app.SET_TASKFLAG(true)
              } else {
                ElNotification({
                  title: '操作成功',
                  message: `交易完成,请等待审核`,
                  type: 'success'
                })
              }
            }
            Store.app.SET_JNL_NO(data.responseJnlNo)
            return Promise.resolve(
              !isEmpty(data.responseBody) ? { responseJnlNo: data.responseJnlNo, ...data.responseBody } : data
            )
          } else {
            if (data.responseCode === 'BM100022') {
              ElNotification({
                title: '您已被强制下线',
                message: '此账号已在其他平台登陆,请重新登陆',
                type: 'warning'
              })
            } else if (data.responseCode === 'BM100021') {
              ElNotification({
                title: data.responseCode,
                message: data.responseMsg || config.url,
                type: 'warning'
              })
              window.location.href = '/'
            } else {
              ElNotification({
                title: data.responseCode,
                message: data.responseMsg || config.url,
                type: 'warning'
              })
            }
            return Promise.reject(data)
          }
        } else {
          return Promise.resolve(data)
        }
      },
      (error: any) => {
        Nprogress.done()
        this.destroy(url)
        let info = error.response || error.request
        if (info) {
          const errorText = codeMessage[info.status] || info.statusText
          ElNotification({
            title: '错误',
            message: errorText || `网络繁忙,${info.status}`,
            type: 'error'
          })
        } else {
          ElNotification({
            title: '错误',
            message: `网络繁忙`,
            type: 'error'
          })
        }
        return Promise.reject(true)
      }
    )
  }
  request(options: any) {
    let data = options.data
    if (
      data != null &&
      data !== '' &&
      data.pageSize != null &&
      data.pageSize > 0 &&
      (data.pageNumber == null || data.pageNumber === 0)
    ) {
      data.pageNumber = 1
    }
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
