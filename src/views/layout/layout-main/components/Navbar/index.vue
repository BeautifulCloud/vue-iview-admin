<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-29 01:26:52
 * @Description: NavBar
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-30 10:05:12
-->
<template>
  <div class="i-navbar">
    <logo v-if="!$store.state.settings.useSidebar" />
    <span
      v-if="$store.state.settings.showFoldIcon&&$store.state.settings.useSidebar"
      class="i-navbar-icon i-hover"
      @click="changeCollapsed"
    >
      <i v-if="$store.state.sidebar.sidebarCollapsed" class="fa fa-indent" aria-hidden="true"></i>
      <i v-else class="fa fa-outdent" aria-hidden="true"></i>
    </span>
    <span
      v-if="$store.state.settings.showRefreshIcon"
      class="i-navbar-icon i-hover"
      @click="refreshRoute"
    >
      <i class="fa fa-refresh" :class="{'fa-spin':refreshSpin}" aria-hidden="true"></i>
    </span>
    <span class="i-navbar-icon i-hover">{{ mainTitle }}</span>
    <div class="i-navbar-right">
      <span v-if="!$store.state.settings.useSidebar" class="i-navbar-icon i-hover">
        <Poptip placement="bottom" width="400" :word-wrap="true" trigger="hover">
          <Icon type="ios-apps" />
          <div slot="content" class="apps-container">
            <poptip-content />
          </div>
        </Poptip>
      </span>
      <span class="i-navbar-icon i-hover">
        <Badge :count="5" class="i-badge">
          <i class="fa fa-bell-o"></i>
        </Badge>
      </span>
      <span class="i-navbar-icon i-hover">
        <Dropdown>
          <Avatar :src="require('@/assets/images/avatar.png')" />管理员
          <DropdownMenu slot="list">
            <DropdownItem>信息修改</DropdownItem>
            <DropdownItem>密码修改</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </span>
      <span class="i-navbar-icon i-hover">
        <Dropdown @on-click="navbarOptions">
          <Icon type="md-options" />
          <DropdownMenu slot="list">
            <DropdownItem name="backManager">后台管理</DropdownItem>
            <DropdownItem name="signOut">退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Logo from './Logo.vue'
import PoptipContent from './PoptipContent.vue'
export default {
  name: 'Navbar',
  components: {
    Logo,
    PoptipContent
  },
  data() {
    return {
      refreshSpin: false
    }
  },
  computed: {
    mainTitle() {
      return this.$route.meta.title
    }
  },
  methods: {
    ...mapActions(['changeCollapsed']),
    refreshRoute() {
      const _this = this
      this.refreshSpin = true
      this.$router.push({
        path: '/blank',
        query: this.$route.path
      })
      setTimeout(() => {
        _this.refreshSpin = false
      }, 1000)
    },
    navbarOptions(name) {
      if (name === 'backManager') console.log('goback')
      if (name === 'signOut') {
        this.$utils.deleteLStorage('token')
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.i-navbar {
  .i-navbar-icon {
    display: inline-block;
    width: auto;
    padding: 0 15px;
    height: 64px;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  .i-navbar-right {
    float: right;
    .i-badge {
      line-height: 1.5;
    }
    .i-dropdown {
      padding: 0 15px;
    }
    .i-img {
      width: 36px;
      vertical-align: middle;
    }
  }
}
</style>
