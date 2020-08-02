import router from '@/router'
import NProgress from 'nprogress' // 页面加载进度条插件
import 'nprogress/nprogress.css'
import store from '../store'
import {
  setTitle
} from '@/utils/router-fun'

import {
  routerConstant
} from "@/assets/mock"
NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  ease: 'ease',
  speed: 500
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  let currentRouter = routerConstant.filter(it => {
      return it.router == to.path
    }),
    tit = currentRouter.length > 0 ? currentRouter[0].title : '',
    updateCrumbList = []
  setTitle(tit == '首页' ? '' : tit)
  if (currentRouter.length > 0) {
    let currentRouterObj = currentRouter[0]
    if (currentRouterObj.grade == 1) {
      if (currentRouterObj.router == '/home') {
        updateCrumbList = [{
          title: currentRouterObj.title,
          router: currentRouterObj.router
        }]
      } else {
        updateCrumbList = [{
          title: '首页',
          router: '/home'
        }, {
          title: currentRouterObj.title,
          router: currentRouterObj.router
        }]
      }
    } else if (currentRouterObj.grade == 2) {
      updateCrumbList = [{
        title: '首页',
        router: '/home'
      }, {
        title: currentRouterObj.groupTitle,
        router: ''
      }, {
        title: currentRouterObj.title,
        router: currentRouterObj.router
      }]
    }
  }
  store.dispatch("app/updateCrumbList", updateCrumbList)
  next()
})

router.afterEach(() => {
  // NProgress.set(0.9)
  NProgress.done()
})