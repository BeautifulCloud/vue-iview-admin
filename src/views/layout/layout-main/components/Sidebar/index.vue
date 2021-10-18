<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-24 13:33:16
 * @Description: sidebar侧边栏
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-10-18 13:15:02
-->
<template>
  <div class="sidebar" :class="{'has-logo':showLogo}">
    <logo />
    <Menu
      ref="sidebarMenu"
      width="auto"
      :theme="$store.state.settings.themeSidebar?'dark':'light'"
      :accordion="$store.state.settings.sidebarAccordion"
      :open-names="[menuName.openName]"
      :active-name="collapsedState?menuName.openName:menuName.activeName"
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
    return {
      menuName: {
        activeName: 'Home',
        openName: 'Home'
      }
    }
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
    }
  },
  watch: {
    $route() {
      const name = {
        activeName: this.$route.name,
        openName: this.$route.meta.openName ? this.$route.meta.openName : this.$route.name
      }
      this.menuName = Object.assign({}, this.menuName, name)
      this.$nextTick(function () {
        this.$refs.sidebarMenu.updateOpened()
        this.$refs.sidebarMenu.updateActiveName()
      })
    },
    '$store.state.sidebar.sidebarCollapsed'() {
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
