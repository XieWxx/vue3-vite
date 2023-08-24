const jsrsasign = require('jsrsasign')
import { defaultSettings } from '@/config/defaultSettings'
const PUBLIC_KEY = process.env.VUE_APP_TITLE === 'pro' ? defaultSettings.PUBLIC_KEY.pro : defaultSettings.PUBLIC_KEY.dev
/**
 * 加密
 * */
// let gKey =
//   'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsgd5neBsKsz8zta6mHDacXu/9hywjcMeIEOaPbeIOql6f46yKnic8BqkDpPQ4bevk0J1BDR3lSxzio+21St5Ha+GUJBGXbJNoivNRmfbxTIdjFI7VzMr8jtqm90LMpTNqzdtvSzKgTfAgsMOfSCu3rdLkSaCkeMxpwNLpBPrZGGfQrFuuuGyqOvDxh/A25cfb5tANSjJCWC3d9QkpADhfyQxd3B5Kpp7BXyFt9rPPdIFiEbBd1IUFsxXg+ggE7cnno4M1hSIHt/Qsdr6xcaFcrBf2xqHEd6WNp70gKzKB+LtsH0vL26boBZQeuk1nFsU66phmzijb6bZrjI60vhwtQIDAQAB'
// let publicKey = '-----BEGIN PUBLIC KEY-----' + gKey + '-----END PUBLIC KEY-----'
export const getSign = (data: any) => {
  const pub = jsrsasign.KEYUTIL.getKey(PUBLIC_KEY)
  return jsrsasign.KJUR.crypto.Cipher.encrypt(data, pub)
}
