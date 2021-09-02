<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-31 14:47:52
 * @Description: 不使用侧边栏时替代的Logo
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-08-31 15:08:46
-->
<template>
  <div class="i-sidebar-logo">
    <router-link class="i-sidebar-logo-link" to="/">
      <img v-if="logo" :src="logo" class="sidebar-logo" />
      <h1 class="sidebar-title">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  data() {
    return {
      logo: require('@/assets/logo.png'),
      title: 'Vue Project'
    }
  }
}
</script>

<style lang="less" scoped>
.i-sidebar-logo {
  display: inline-block;
  width: 200px;
  height: 64px;
  line-height: 64px;
  text-align: center;

  & .i-sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 36px;
      height: 36px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}
</style>
