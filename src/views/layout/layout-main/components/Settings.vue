<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-30 15:05:57
 * @Description: 设置按钮的内容
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-17 09:50:33
-->
<template>
  <div class="i-settings">
    <Collapse simple accordion>
      <Panel name="themes">
        主题选择
        <template #content>
          <div class="i-settings-item">
            <RadioGroup v-model="themeName">
              <Radio v-for="themeItem in themes" :key="themeItem.url" :label="themeItem.url">
                <div class="i-settings-themeItem">
                  <img :src="themeItem.imgPath" :alt="themeItem.name" class="i-settings-img" />
                  <p>{{ themeItem.name }}</p>
                </div>
              </Radio>
            </RadioGroup>
          </div>
        </template>
      </Panel>
      <Panel name="sidebar">
        侧边栏设置
        <template #content>
          <div class="i-settings-item">
            <span>开启侧边栏</span>
            <Switch v-model="useSidebar" class="i-settings-switch" />
          </div>
          <div class="i-settings-item">
            <span>固定侧栏</span>
            <Switch v-model="fixedSidebar" class="i-settings-switch" :disabled="!useSidebar" />
          </div>
          <div class="i-settings-item">
            <span>使用暗色背景</span>
            <Switch v-model="themeSidebar" class="i-settings-switch" :disabled="!useSidebar" />
          </div>
          <div class="i-settings-item">
            <span>折叠后显示父级菜单名</span>
            <Switch v-model="showSidebarTitle" class="i-settings-switch" :disabled="!useSidebar" />
          </div>
          <div class="i-settings-item">
            <span>开启手风琴模式</span>
            <Switch v-model="sidebarAccordion" class="i-settings-switch" :disabled="!useSidebar" />
          </div>
        </template>
      </Panel>
      <Panel name="topbar">
        顶栏设置
        <template #content>
          <div class="i-settings-item">
            <span>固定顶栏</span>
            <Switch v-model="fixedHeader" class="i-settings-switch" />
          </div>
          <div class="i-settings-item">
            <span>显示重载页面按钮</span>
            <Switch v-model="showRefreshIcon" class="i-settings-switch" />
          </div>
          <div class="i-settings-item">
            <span>显示折叠按钮</span>
            <Switch v-model="showFoldIcon" class="i-settings-switch" :disabled="!useSidebar" />
          </div>
        </template>
      </Panel>
      <Panel name="tagsView">
        页签设置
        <template #content>
          <div class="i-settings-item">
            <span>开启多页签</span>
            <Switch v-model="showTagsView" class="i-settings-switch" />
          </div>
          <div class="i-settings-item">
            <span>页签滚动速度</span>
            <Slider v-model="tagsViewSpeed" show-stops :step="10" :marks="marks" />
          </div>
        </template>
      </Panel>
      <Panel name="tableComponent">
        表格设置
        <template #content>
          <div class="i-settings-item">
            <span>显示边框</span>
            <Switch v-model="showTableBorder" class="i-settings-switch" />
          </div>
          <div class="i-settings-item">
            <span>显示斑马纹</span>
            <Switch v-model="showTableStripe" class="i-settings-switch" />
          </div>
          <div class="i-settings-item">
            <span>显示表头</span>
            <Switch v-model="showTableHeader" class="i-settings-switch" />
          </div>
          <div class="i-settings-item">
            <span>显示原始数据导出按钮</span>
            <Switch v-model="showTableExport" class="i-settings-switch" />
          </div>
          <div class="i-settings-item">
            <span>显示排序数据导出按钮</span>
            <Switch v-model="showTableSortExport" class="i-settings-switch" />
          </div>
          <div class="i-settings-item">
            <span>显示自定义数据导出按钮</span>
            <Switch v-model="showTableCustomExport" class="i-settings-switch" />
          </div>
          <div class="i-settings-item">
            <span>显示列设置</span>
            <Switch v-model="showTableColumns" class="i-settings-switch" />
          </div>
          <div class="i-settings-item">
            <span>固定列顺序</span>
            <Switch v-model="fixTableColumns" class="i-settings-switch" />
          </div>
          <div class="i-settings-item">
            <span>表格尺寸</span>
            <Radio-group v-model="tableSize" type="button" class="i-settings-radiogroup">
              <Radio label="large">大</Radio>
              <Radio label="default">中</Radio>
              <Radio label="small">小</Radio>
            </Radio-group>
          </div>
        </template>
      </Panel>
      <Panel name="other">
        其他设置
        <template #content>
          <div class="i-settings-item">
            <span>显示设置功能</span>
            <Switch v-model="showSetting" class="i-settings-switch" />
          </div>
        </template>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Settings',
  data() {
    return {
      themes: [
        {
          url: 'theme_base',
          name: '原始',
          imgPath: require('@/assets/images/theme_image/theme_base.png')
        },
        {
          url: 'theme_concert',
          name: '音乐会',
          imgPath: require('@/assets/images/theme_image/theme_concert.png')
        },
        {
          url: 'theme_mkl',
          name: '马卡龙',
          imgPath: require('@/assets/images/theme_image/theme_mkl.png')
        },
        {
          url: 'theme_lkk',
          name: '洛可可',
          imgPath: require('@/assets/images/theme_image/theme_lkk.png')
        },
        {
          url: 'theme_mld',
          name: '莫兰迪',
          imgPath: require('@/assets/images/theme_image/theme_mld.png')
        },
        {
          url: 'theme_deep',
          name: '深海底',
          imgPath: require('@/assets/images/theme_image/theme_deep.png')
        }
      ],
      marks: {
        0: '0.5',
        10: '1',
        20: '2',
        30: '3',
        40: '4',
        50: '5',
        60: '6',
        70: '7',
        80: '8',
        90: '9',
        100: '10'
      }
    }
  },
  computed: {
    themeName: {
      get() {
        return this.$store.state.settings.themeName
      },
      set(val) {
        this.changeSettings({ key: 'themeName', value: val })
        import('@/assets/themes/' + val + '.less?')
      }
    },
    useSidebar: {
      get() {
        return this.$store.state.settings.useSidebar
      },
      set(val) {
        this.changeSettings({ key: 'useSidebar', value: val })
      }
    },
    tagsViewSpeed: {
      get() {
        return this.$store.state.settings.tagsViewSpeed
      },
      set(val) {
        this.changeSettings({ key: 'tagsViewSpeed', value: val })
      }
    },
    themeSidebar: {
      get() {
        return this.$store.state.settings.themeSidebar
      },
      set(val) {
        this.changeSettings({ key: 'themeSidebar', value: val })
      }
    },
    showFoldIcon: {
      get() {
        return this.$store.state.settings.showFoldIcon
      },
      set(val) {
        this.changeSettings({ key: 'showFoldIcon', value: val })
      }
    },
    showRefreshIcon: {
      get() {
        return this.$store.state.settings.showRefreshIcon
      },
      set(val) {
        this.changeSettings({ key: 'showRefreshIcon', value: val })
      }
    },
    showSetting: {
      get() {
        return this.$store.state.settings.showSetting
      },
      set(val) {
        // this.changeSettings({ key: 'showSetting', value: val })
        this.generateFrontRoutes({ type: 'front', names: ['Receive', 'Content', 'Test1', 'Test2', 'Test3'] })
      }
    },
    showTagsView: {
      get() {
        return this.$store.state.settings.showTagsView
      },
      set(val) {
        this.changeSettings({ key: 'showTagsView', value: val })
      }
    },
    showSidebarTitle: {
      get() {
        return this.$store.state.settings.showSidebarTitle
      },
      set(val) {
        this.changeSettings({ key: 'showSidebarTitle', value: val })
      }
    },
    sidebarAccordion: {
      get() {
        return this.$store.state.settings.sidebarAccordion
      },
      set(val) {
        this.changeSettings({ key: 'sidebarAccordion', value: val })
      }
    },
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(val) {
        this.changeSettings({ key: 'fixedHeader', value: val })
      }
    },
    fixedSidebar: {
      get() {
        return this.$store.state.settings.fixedSidebar
      },
      set(val) {
        this.changeSettings({ key: 'fixedSidebar', value: val })
      }
    },
    showTableBorder: {
      get() {
        return this.$store.state.settings.showTableBorder
      },
      set(val) {
        this.changeSettings({ key: 'showTableBorder', value: val })
      }
    },
    showTableStripe: {
      get() {
        return this.$store.state.settings.showTableStripe
      },
      set(val) {
        this.changeSettings({ key: 'showTableStripe', value: val })
      }
    },
    showTableHeader: {
      get() {
        return this.$store.state.settings.showTableHeader
      },
      set(val) {
        this.changeSettings({ key: 'showTableHeader', value: val })
      }
    },
    showTableExport: {
      get() {
        return this.$store.state.settings.showTableExport
      },
      set(val) {
        this.changeSettings({ key: 'showTableExport', value: val })
      }
    },
    showTableSortExport: {
      get() {
        return this.$store.state.settings.showTableSortExport
      },
      set(val) {
        this.changeSettings({ key: 'showTableSortExport', value: val })
      }
    },
    showTableCustomExport: {
      get() {
        return this.$store.state.settings.showTableCustomExport
      },
      set(val) {
        this.changeSettings({ key: 'showTableCustomExport', value: val })
      }
    },
    showTableColumns: {
      get() {
        return this.$store.state.settings.showTableColumns
      },
      set(val) {
        this.changeSettings({ key: 'showTableColumns', value: val })
      }
    },
    fixTableColumns: {
      get() {
        return this.$store.state.settings.fixTableColumns
      },
      set(val) {
        this.changeSettings({ key: 'fixTableColumns', value: val })
      }
    },
    tableSize: {
      get() {
        return this.$store.state.settings.tableSize
      },
      set(val) {
        this.changeSettings({ key: 'tableSize', value: val })
      }
    }
  },
  methods: {
    ...mapActions(['changeSettings', 'generateRoutes'])
  }
}
</script>

<style lang="less" scoped>
.i-settings {
  padding: 0 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  &-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }
  &-themeItem {
    text-align: center;
  }
  &-img {
    width: 200px;
  }
  &-switch,
  &-radiogroup {
    float: right;
  }
}
</style>
<style lang="less">
.i-settings {
  .ivu-collapse {
    .ivu-collapse-item {
      .ivu-collapse-header,
      .ivu-collapse-content {
        padding-left: 0;
        padding: 0;
      }
    }
  }
}
</style>
