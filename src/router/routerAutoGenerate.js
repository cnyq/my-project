const modulesList = [] // 模块列表
const generatedRouter = [] // 生成的路由
const generatedRouterMap = {} // 生成的路由map (判重使用，防止路由重复)
// 懒加载读取文件目录
const modulesFiles = require.context('../views', true, /\.vue$/, 'lazy')
// 遍历文件目录
modulesFiles.keys().forEach((modulePath) => {
  modulesList.push(modulePath.replace(/^\.\/(.*)\.\w+$/, '$1'))
})

// 生成路由
modulesList.forEach((path) => {
  const pathList = path.split('/')
  // 若 .vue 文件存在于 components 目录下，说明为某页面拆分组件  不去注入路由。
  if (pathList[pathList.length - 2] === 'components') {
    return false
  }
  let name = pathList[pathList.length - 1]
  /* 查询到name重复，抛错。*/
  if (generatedRouterMap[name]) {
    /* 特别声明 ： 因为异步不能读取到文件的内容，所以只能以文件名作为路由 */
    throw new Error(`路由名（文件名）重复,请检查对比目录文件：@/src/views/"${generatedRouterMap[name]},@/src/views/${name}`)
  } else {
    generatedRouterMap[name] = path
    generatedRouter.push({
      name: name,
      path: '/' + name,
      component: () => import('@/views/' + path),
      beforeEnter: (to, from, next) => {
        next()
       }
    })
  }
})
export default generatedRouter