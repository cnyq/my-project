import router from '@/router'
import NProgress from 'nprogress' // 页面加载进度条插件
import 'nprogress/nprogress.css'
import {
  setTitle
} from '@/utils/title-set'
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
  console.log(to.path)
  let tit = routerConstant.filter(it => {
    return it.router == to.path
  })[0].title
  setTitle(tit == '首页' ? '' : tit)
  next()
})

router.afterEach(() => {
  // NProgress.set(0.9)
  NProgress.done()
})