<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-01 10:25:46
 * @Description: tags-view 页签功能
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-30 17:33:14
-->
<template>
  <div class="i-tags-view">
    <span v-if="isOverflow" class="i-tags-view-icon i-hover" @click="scrollMove('left')">
      <Icon type="ios-arrow-back" />
    </span>
    <div ref="viewContent" class="i-tags-view-content">
      <div ref="viewScroll" class="i-tags-view-scroll">
        <router-link
          v-for="(tagItem,index) in $store.state.tagsView.visitedViews"
          :key="'tagView'+index"
          :to="tagItem.meta?tagItem.meta.toPath:tagItem.path"
        >
          <Tag type="border" class="tag-item">{{ tagItem.name }}</Tag>
        </router-link>
      </div>
    </div>
    <span v-if="isOverflow" class="i-tags-view-icon i-hover" @click="scrollMove('right')">
      <Icon type="ios-arrow-forward" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'TagsView',
  data() {
    return {
      isOverflow: false,
      translateDistance: 0,
      affixTags: [],
      dynamicTags: []
    }
  },
  computed: {
    visitedViews() {
      this.initScroll()

      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route() {}
  },
  mounted() {
    // 走sidebar 的frontlist 所有有权限才能查看的view ,把里面所有affix的view挑出来，后续再判断是否是affix，如果是就active中，其他的时候就变化添加进去
  },
  methods: {
    /**
     * @func initScroll
     * @desc 通过判断views长度与容器长度判别是否需要开始滚动翻页模式
     */
    initScroll() {
      const contentDom = this.$refs.viewContent
      const scrollDom = this.$refs.viewScroll
      this.$nextTick(() => {
        if (contentDom.clientWidth < scrollDom.clientWidth) {
          this.isOverflow = true
          scrollDom.style.mixWidth = contentDom.clientWidth
          scrollDom.addEventListener('wheel', (e) => this.scrollXFun(e, scrollDom, contentDom))
        } else {
          this.isOverflow = false
          scrollDom.removeEventListener('wheel', (e) => this.scrollXFun(e, scrollDom, contentDom))
          this.translateDistance = 0
        }
      })
    },
    /**
     * @func scrollXFun
     * @desc 鼠标滚轮控制横向滚动与滚动速度
     * @param {e(监听滚轮事件的返回),scrollDom(滚动块), contentDom(容器块)}
     */
    scrollXFun(e, scrollDom, contentDom) {
      const speed = this.$store.state.settings.tagsViewSpeed
      let realSpeed = Number
      if (speed === 0) realSpeed = 0.5
      else realSpeed = speed / 10
      const judgeX = this.translateDistance + (e.deltaY / 10) * realSpeed
      if (judgeX >= scrollDom.clientWidth - contentDom.clientWidth) this.translateDistance = scrollDom.clientWidth - contentDom.clientWidth
      else if (judgeX <= 0) this.translateDistance = 0
      else this.translateDistance += (e.deltaY / 10) * realSpeed
      scrollDom.style.transform = `translate(${-this.translateDistance}px)`
    },
    /**
     * @func scrollMove
     * @desc tagViews超出容器后可进行点击左右按钮进行views翻页
     * @param {direction(判断是向左翻页还是向右翻页)}
     */
    scrollMove(direction) {
      const contentDom = this.$refs.viewContent
      const scrollDom = this.$refs.viewScroll
      let moveXJudge
      if (direction === 'right') moveXJudge = this.translateDistance + contentDom.clientWidth
      else moveXJudge = this.translateDistance + -contentDom.clientWidth
      if (moveXJudge <= 0) this.translateDistance = 0
      else if (moveXJudge >= scrollDom.clientWidth - contentDom.clientWidth) this.translateDistance = scrollDom.clientWidth - contentDom.clientWidth
      else this.translateDistance = moveXJudge
      scrollDom.style.transform = `translate(${-this.translateDistance}px)`
    }
  }
}
</script>

<style lang="less" scoped>
.i-tags-view {
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
  &-icon {
    width: 32px;
    font-size: 16px;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
  }
  &-content {
    flex: 1;
    height: 32px;
    overflow: hidden;
    padding: 0 6px;
  }
  &-scroll {
    box-sizing: border-box;
    white-space: nowrap;
    float: left;
    .tag-item {
      height: 32px;
      line-height: 32px;
      padding: 0 12px;
    }
  }
}
</style>
