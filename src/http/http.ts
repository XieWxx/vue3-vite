import { http } from '@/http/request'
import { loginApi } from '@/http/interface/login'

const login = (params: any) => {
  return http.post(loginApi.login, params)
}

export default { login }
