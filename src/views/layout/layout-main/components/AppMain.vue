<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-24 15:56:58
 * @Description: AppMain 组件
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-23 13:45:37
-->
<template>
  <section class="app-main">
    <transition
      name="animate"
      mode="out-in"
      enter-active-class="animate__animated animate__fadeInLeft"
      leave-active-class="animate__animated animate__fadeOutRight"
      :duration="{ enter: 500, leave:500}"
    >
      <keep-alive>
        <router-view />
      </keep-alive>
      <!-- <keep-alive :include="cachedViews">
        <router-link :key="key"></router-link>
      </keep-alive>-->
    </transition>
  </section>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  methods: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="less" scoped>
.app-main {
  min-height: 100%;
  padding: 12px 6px;
  background-color: white;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  & > .l-view {
    flex: auto;
    display: flex;
    flex-direction: column;
  }
}
.fixed-header + .app-main {
  padding-top: 64px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 64 + 44 */
    min-height: calc(100vh - 108px);
  }
  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>
