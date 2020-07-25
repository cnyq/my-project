/*
 * @Author: your name
 * @Date: 2020-07-22 21:56:22
 * @LastEditTime: 2020-07-22 22:17:42
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\router\index.js
 */ 
import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/components/layout'
import generatedRouter from './routerPackage'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          affix: true,
          name: '首页'
        },
        component: () => import('@/views/pagesManage/home')
      },
      ...generatedRouter
    ]
  }, {
    path: '/404',
    name: '404',
    component: () => import('@/components/pages/e404')
  }, {
    path: '*', redirect: '/404', hidden: true
  },
];
console.log(process.env)
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
