<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-30 15:30:52
 * @Description: 右侧设置按钮
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-08-31 11:35:18
-->
<template>
  <div ref="panel" class="i-panel" :class="{'i-panel-show':show}">
    <div class="i-panel-background"></div>
    <div class="i-panel-main">
      <div
        class="i-panel-handle i-color-primary"
        :style="{'top':topDistance+'px'}"
        @click="show=!show"
      >
        <i class="fa" :class="show?'fa-close':'fa-cog'"></i>
      </div>
      <div class="i-panel-block">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { addClass, removeClass } from '@/utils/tool'
export default {
  name: 'PositionPanel',
  props: {
    clickNotClose: {
      type: Boolean,
      default() {
        return false
      }
    },
    topDistance: {
      type: Number,
      default() {
        return 250
      }
    }
  },
  data() {
    return {
      show: false
    }
  },
  watch: {
    show(newVal) {
      if (newVal && !this.clickNotClose) {
        this.addEventClick()
      }
      if (newVal) addClass(document.body, 'showPositionPanel')
      else removeClass(document.body, 'showPositionPanel')
    }
  },
  mounted() {
    this.insertToBody()
  },
  beforeDestroy() {
    const elx = this.$refs.panel
    elx.remove()
  },
  methods: {
    addEventClick() {
      window.addEventListener('click', this.closeSidebar)
    },
    closeSidebar(evt) {
      const parent = evt.target.closest('.i-panel-main')
      if (!parent) {
        this.show = false
        window.removeEventListener('click', this.closeSidebar)
      }
    },
    insertToBody() {
      const elx = this.$refs.panel
      const body = document.querySelector('body')
      body.insertBefore(elx, body.firstChild)
    }
  }
}
</script>

<style lang="less" scoped>
.i-panel {
  &-background {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s cubic-bezes(0.7, 0.3, 0.1, 1);
    background: rgba(0, 0, 0, 0.2);
    z-index: -1;
  }
  &-main {
    width: 100%;
    max-width: 260px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
    transform: translate(100%);
    background: #fff;
    z-index: 40000;
  }

  &-show {
    transition: all 0.8s cubic-bezier(0.7, 0.3, 0.1, 1);
    .i-panel-background {
      z-index: 20000;
      opacity: 1;
      width: 100%;
      height: 100%;
    }
    .i-panel-main {
      transform: translate(0);
    }
  }
  &-handle {
    width: 48px;
    height: 48px;
    position: absolute;
    left: -48px;
    text-align: center;
    font-size: 24px;
    border-radius: 6px 0 0 6px !important;
    z-index: 0;
    pointer-events: auto;
    cursor: pointer;
    line-height: 48px;
    i {
      font-size: 24px;
      line-height: 48px;
    }
  }
  &-block {
    max-height: 100vh;
    overflow-y: auto;
  }
}
</style>
<style>
.showPositionPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>
