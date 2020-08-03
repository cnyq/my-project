<template>
  <el-menu
    :default-active="$route.path"
    class="aside-menu"
    background-color="#313131"
    text-color="#fff"
    active-text-color="#fff"
    :collapse="isCollapse"
    :unique-opened="true"
    :router="true"
  >
    <template v-for="(items,index) in menuList" >
      <template v-if="items.children.length>0">
        <el-submenu :index="items.router" :key="index">
          <template slot="title">
            <i :class="iconState(items.router)"></i>
            <span slot="title">{{items.title}}</span>
          </template>
          <el-menu-item
            v-for="(item,idx) in items.children"
            :key="idx"
            :index="item.router"
          >{{item.title}}</el-menu-item>
        </el-submenu>
      </template>
      <template v-if="items.children.length === 0">
        <el-menu-item :index="items.router" :key="index">
          <i :class="iconState(items.router)"></i>
          <span slot="title">{{items.title}}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
<script>
import { menuList } from "@/assets/mock"
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      menuList: menuList
    }
  },
  computed: {
    ...mapGetters(["isCollapse"])
  },
  methods: {
    iconState(path){
      return path == '/home' ?'el-icon-s-home':'el-icon-menu'
    },
  }
}
</script>