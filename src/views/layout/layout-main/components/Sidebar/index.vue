<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-24 13:33:16
 * @Description: sidebar侧边栏
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-14 21:34:33
-->
<template>
  <div class="sidebar" :class="{'has-logo':showLogo}">
    <logo />
    <Menu
      ref="sidebarMenu"
      width="auto"
      :theme="$store.state.settings.themeSidebar?'dark':'light'"
      :accordion="$store.state.settings.sidebarAccordion"
      :open-names="[menuActiveName]"
      :active-name="collapsedState?menuActiveName:dropdownActiveName"
      class="sidebar-menu"
      :class="['menu-item',collapsedState ? 'collapsed-menu' : '']"
    >
      <transition
        name="custom-classes-transition"
        appear
        type="animate"
        :duration="{ enter: 500, leave:500}"
        enter-active-class="animate__animated animate__backInDown"
        leave-active-class="animate__animated animate__flipOutX"
      >
        <dropdown-items v-if="collapsedState" />
        <submenu-items v-else />
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
    return {}
  },
  computed: {
    showLogo() {
      return false
    },
    collapsedState() {
      return this.$store.state.sidebar.sidebarCollapsed
    },
    menuActiveName() {
      return this.$store.state.sidebar.menuActiveName
    },
    dropdownActiveName() {
      return this.$store.state.sidebar.dropdownActiveName
    }
  },
  watch: {
    '$store.state.sidebar.sidebarCollapsed'(newVal, oldVal) {
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
