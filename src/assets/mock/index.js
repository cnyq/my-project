const routerConstant = [{
  grade: 1,
  group: '',
  groupTitle: '',
  title: '首页',
  router: '/home'
}, {
  grade: 2,
  group: 'page',
  groupTitle: '页面',
  title: '页面1',
  router: '/page'
}, {
  grade: 2,
  group: 'page',
  groupTitle: '页面',
  title: '页面2',
  router: '/page2'
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