import router from '@/router'
import NProgress from 'nprogress' // 页面加载进度条插件
import 'nprogress/nprogress.css'
NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  ease: 'ease',
  speed: 500
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  // NProgress.set(0.9)
  NProgress.done()
})
