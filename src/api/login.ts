/**
 * 登录、退出登录、获取用户信息相关API
 * */
import axios from '@/http/axios.request'
import { Axios } from 'axios'

// 类型声明
interface Promise {}

// 登录接口
export const login = (data: any) => {
  return axios.request({
    url: '/login',
    method: 'POST',
    data: data
  })
}
// 获取图形验证码
export const getImg = () => {
  return axios.request({
    url: '/genValidateImg',
    method: 'GET'
  })
}
// 获取用户信息
export const getInfo = () => {
  return axios.request({
    url: '/userInfoQuery',
    method: 'GET'
  })
}
// 修改用户密码
export const updatePwd = (data: any) => {
  return axios.request({
    url: 'user/updatePwd',
    method: 'POST',
    data
  })
}
//用户密码修改
export const updatePassword = (data: any) => {
  return axios.request({
    url: '/update/pin',
    method: 'POST',
    data
  })
}

// 退出登录
export const logout = (data: any) => {
  return axios.request({
    url: '/logout',
    method: 'POST',
    data
  })
}

// 获取短信验证码
export const getSmsCaptcha = (data: any) => {
  return axios.request({
    url: '/account/sms',
    method: 'POST',
    data
  })
}
