<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-24 22:45:51
 * @Description: Logo
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-03 15:34:10
-->
<template>
  <div
    class="i-sidebar-logo i-color-primary i-border"
    :class="{'collapse':$store.state.sidebarCollapsed}"
  >
    <transition name="sidebarLogoFade">
      <router-link
        v-if="$store.state.sidebar.sidebarCollapsed"
        key="collapse"
        class="i-sidebar-logo-link"
        to="/"
      >
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <router-link v-else key="expand" class="i-sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
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
  position: relative;
  width: 100%;
  height: 64px;
  line-height: 64px;
  text-align: center;

  overflow: hidden;
  .sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
  }
  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }

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

  &.collapse {
    .sidebar-logo {
      width: 40px;
      height: 40px;
      margin: 0;
    }
  }
}
</style>
