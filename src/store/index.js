/*
 * @Author: your name
 * @Date: 2020-07-22 22:01:04
 * @LastEditTime: 2020-07-22 22:03:40
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\store\index.js
 */ 
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex);

const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = {}

modulesFiles.keys().forEach((modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules
}, {});

const store = new Vuex.Store({
  modules,
  getters
});


export default store