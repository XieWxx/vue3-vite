/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-11-14 11:38:40
 * @LastEditTime: 2019-11-14 11:38:40
 * @LastEditors: your name
 */
/**
 Create by GaryLew in 2019-08-07
 */
import HttpRequest from '@/http/axios'
import { defaultSettings } from '@/config/defaultSettings'
const baseUrl = process.env.NODE_ENV === 'development' ? defaultSettings.baseUrl.dev : defaultSettings.baseUrl.pro

const axios: HttpRequest = new HttpRequest(baseUrl)
export default axios
