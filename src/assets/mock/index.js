const routerConstant = [{
  grade: 1,
  group: '',
  groupTitle: '',
  title: '首页',
  router: '/home'
}, {
  grade: 2,
  group: 'page',
  groupTitle: 'd3.js',
  title: 'd3 柱状图',
  router: '/d3-bar-chart'
}, {
  grade: 2,
  group: 'page',
  groupTitle: 'd3.js',
  title: 'd3测试',
  router: '/d3text'
}]

let menuList = []
routerConstant.map(it => {
  if (it.grade == 1) {
    menuList.push({
      title: it.title,
      router: it.router,
      children: []
    })
  } else if (it.grade == 2) {
    if (menuList.length == 0) {
      menuList.push({
        title: it.groupTitle,
        router: it.group,
        children: [{
          title: it.title,
          router: it.router
        }]
      })
    } else {
      let res = menuList.some(item => {
        if (item.router == it.group) {
          item.children.push({
            title: it.title,
            router: it.router
          })
          return true
        }
      })
      if (!res) {
        menuList.push({
          title: it.groupTitle,
          router: it.group,
          children: [{
            title: it.title,
            router: it.router
          }]
        })
      }
    }
  }
})
export {
  routerConstant,
  menuList
}