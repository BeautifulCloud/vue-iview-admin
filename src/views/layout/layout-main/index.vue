<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-23 17:20:28
 * @Description: 主菜单布局
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-01 14:07:53
-->
<template>
  <Layout class="i-layout i-layout-left-menu">
    <Sider
      v-if="$store.state.settings.useSidebar"
      v-model="$store.state.sidebarCollapsed"
      hide-trigger
      collapsible
      :collapsed-width="78"
      class="i-layout-sider i-v-shadow"
    >
      <sidebar />
    </Sider>
    <Layout class="i-layout-main">
      <Header class="i-layout-header i-color-primary i-h-shadow">
        <navbar />
      </Header>
      <Content :class="{hasTagsView:$store.state.settings.showTagsView}" class="i-layout-content">
        <tags-view v-if="$store.state.settings.showTagsView" />
        <app-main />
        <position-panel>
          <settings />
        </position-panel>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import { AppMain, Sidebar, Navbar, TagsView, Settings } from './components'
import PositionPanel from '@/components/base/PositionPanel'
export default {
  name: '',
  components: {
    AppMain,
    Sidebar,
    Navbar,
    TagsView,
    PositionPanel,
    Settings
  },
  data() {
    return {}
  }
}
</script>

<style lang="less">
@layout: i-layout;
.@{layout} {
  // i-layout-sider {
  // }
  &-main {
    .@{layout}-header {
      padding: 0;
    }
    .@{layout}-content {
      padding: 0 12px;
    }
  }
}
</style>
