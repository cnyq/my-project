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
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];
console.log(process.env)
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
