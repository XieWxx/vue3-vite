import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import trendsRouter from '@/router/trendsRouter'
const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/slide-verify',
    name: 'Login',
    meta: {
      hidden: true,
      title: '登录页'
    },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    meta: {
      hidden: false
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'House'
        }
      }
    ]
  },
  {
    path: '/404',
    meta: {
      hidden: true,
      title: '404'
    },
    component: () => import('@/views/error_page/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes
})
// 创建一个变量，用来判断是否已经动态添加了路由  防止陷入动态路由死循环
let needLoad = true
// 配置白名单
const whiteList = ['/slide-verify']
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('satoken')
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  if (!token) {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/slide-verify')
    }
  } else {
    if (to.path === '/slide-verify') {
      next('/home')
    } else {
      if (needLoad) {
        // 这里用router.options.routes  是因为在实际应用中，我发现直接router.addRoute动态添加路由后，页面总是为空，后来发现新增的路由并没有添加成功，通过此方法，可以有效保证动态添加路由成功并成功跳转
        const current: any = router.options.routes
        trendsRouter.forEach((v: any) => {
          current[1].children.push(v)
          router.addRoute('layout', v)
        })
        router.addRoute({
          path: '/:catchAll(.*)',
          redirect: '/404'
        })
        needLoad = false
        // 防止空白页面或者404  动态添加完后，路由重新跳转
        next({ ...to, replace: true })
      } else {
        next()
      }
    }
  }
})
export default router
