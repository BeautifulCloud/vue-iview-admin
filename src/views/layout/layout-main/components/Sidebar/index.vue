<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-24 13:33:16
 * @Description: sidebar侧边栏
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-01 15:54:57
-->
<template>
  <div class="sidebar" :class="{'has-logo':showLogo}">
    <logo />
    <Menu
      ref="sidebarMenu"
      width="auto"
      :theme="$store.state.settings.themeSidebar?'dark':'light'"
      :accordion="$store.state.settings.sidebarAccordion"
      :open-names="[$store.state.menuActiveName]"
      :active-name="$store.state.sidebarCollapsed?$store.state.menuActiveName:$store.state.dropdownActiveName"
      class="sidebar-menu"
      :class="['menu-item',$store.state.sidebarCollapsed ? 'collapsed-menu' : '']"
    >
      <transition
        name="custom-classes-transition"
        appear
        type="animate"
        :duration="{ enter: 500, leave:500}"
        enter-active-class="animate__animated animate__backInDown"
        leave-active-class="animate__animated animate__flipOutX"
      >
        <dropdown-items v-if="$store.state.sidebarCollapsed" :menu-list="menuList" />
        <submenu-items v-else :menu-list="menuList" />
      </transition>
    </Menu>
  </div>
</template>
<script>
import Logo from './Logo'
import SubmenuItems from './SubmenuItems'
import DropdownItems from './DropdownItems'
export default {
  name: 'Sidebar',
  components: { Logo, SubmenuItems, DropdownItems },
  data() {
    return {
      menuActiveName: 'home',
      dropdownActiveName: '',
      menuList: this.$store.state.menuList
    }
  },
  computed: {
    showLogo() {
      return false
    }
  },
  watch: {
    '$store.state.sidebarCollapsed'(newVal, oldVal) {
      this.$nextTick(function () {
        this.$refs.sidebarMenu.updateOpened()
        this.$refs.sidebarMenu.updateActiveName()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.sidebar {
  height: 100%;
}
</style>
