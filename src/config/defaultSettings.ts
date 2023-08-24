/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * autoHideHeader - 向下滚动时，隐藏 Header : boolean
 * contentWidth - 内容区布局： 流式 |  固定
 * - Vue-ls 插件配置项 (localStorage/sessionStorage)
 * storageOptions: {
 *   namespace: 'FL_', // 前缀
 *   name: 'ls', // 方法名字 Vue.[ls] or this.[$ls],
 *   storage: 'local' // 存储方式 session, local, memory
 * }
 *
 */

interface DefaultSettings {
  title: string
  primaryColor: string
  navTheme: 'dark' | 'light'
  layout: 'sidemenu' | 'topmenu'
  contentWidth: 'Fluid' | 'Fixed'
  fixedHeader: boolean
  fixSiderbar: boolean
  autoHideHeader: boolean
  colorWeak: boolean
  multiTab: boolean
  production: boolean
  storageOptions: object
  baseUrl: {
    dev: string
    pro: string
  }
  PUBLIC_KEY: object
}
const defaultSettings: DefaultSettings = {
  title: '后台管理系统',
  // globalFooter: `2018 - ${new Date().getFullYear()} <a href="http://www.bosc.cn/" target="_blank"></a>`,
  primaryColor: '#1891FF',
  // primaryColor: '#52C41A',
  navTheme: 'light',
  layout: 'sidemenu',
  contentWidth: 'Fixed',
  fixedHeader: true,
  fixSiderbar: true,
  autoHideHeader: true,
  colorWeak: false,
  multiTab: true,
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',
  storageOptions: {
    namespace: 'FL_',
    name: 'ls',
    storage: 'local'
  },
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    // 开发环境地址
    dev: '/api/v1',
    // dev: '/api',
    // 生产环境地址
    pro: '/api/v1'
    // pro: '/api'
  },
  /**
   * SHA256秘钥
   * */
  PUBLIC_KEY: {
    // dev: `-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfz0bcLngbZKy7SKP26DPWQKUMGlRXodYvThjjIUXqEn6zxJM2SHKb/1nakqxkTEmcAr8DqF4brUGmmHIQr6KaVF88cfpCtpeqqgcH5Du0leFNaVhM9CmVPkLFXTClFtUdWRNgrH7iEwQiYhCctYLJFfzSopQQMaOv6VWt7IZI+wIDAQAB-----END PUBLIC KEY-----`,
    pro: `-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDYoByQocPVYteXOeiQAhLj3MX2WGnKbQ75XLVwz9jaquEpKKhl9dVW0/Twdm+nV6FvA78AziFs+DLwletOZRkLpK7NtTWlOQstv5DO08GRwjc2glUQDbbCSM9lIOY+19AAJZaD6IxRiWtxPR41prvvS1tB2d0UFXKwDQXom0sSMwIDAQAB-----END PUBLIC KEY-----`,
    dev: `-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsgd5neBsKsz8zta6mHDacXu/9hywjcMeIEOaPbeIOql6f46yKnic8BqkDpPQ4bevk0J1BDR3lSxzio+21St5Ha+GUJBGXbJNoivNRmfbxTIdjFI7VzMr8jtqm90LMpTNqzdtvSzKgTfAgsMOfSCu3rdLkSaCkeMxpwNLpBPrZGGfQrFuuuGyqOvDxh/A25cfb5tANSjJCWC3d9QkpADhfyQxd3B5Kpp7BXyFt9rPPdIFiEbBd1IUFsxXg+ggE7cnno4M1hSIHt/Qsdr6xcaFcrBf2xqHEd6WNp70gKzKB+LtsH0vL26boBZQeuk1nFsU66phmzijb6bZrjI60vhwtQIDAQAB-----END PUBLIC KEY-----`
  }
}

export { defaultSettings }
