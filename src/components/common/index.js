import Vue from 'vue'

const requireComponent = require.context('./', true, /\.vue$/)

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    // 全局注册组件
    Vue.component(
        componentConfig.default.name,
        componentConfig.default
    )
})