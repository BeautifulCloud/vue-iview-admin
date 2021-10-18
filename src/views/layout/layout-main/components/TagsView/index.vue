<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-01 10:25:46
 * @Description: tags-view 页签功能
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-10-18 13:17:00
-->
<template>
  <div class="i-tags-view">
    <span v-if="isOverflow" class="i-tags-view-icon i-hover" @click="scrollMove('left')">
      <Icon type="ios-arrow-back" />
    </span>
    <div ref="viewContent" class="i-tags-view-content">
      <div ref="viewScroll" class="i-tags-view-scroll">
        <!-- <template :to="tagItem.meta?tagItem.meta.toPath:tagItem.path"> -->
        <div
          v-for="(tagItem,index) in visitedViews"
          :key="'tagView'+index"
          class="tag-item"
          :class="isActive(tagItem)?'i-active':''"
          @click="activeTag(tagItem)"
        >
          <span>{{ tagItem.meta.title }}</span>
          <Icon
            v-if="!(tagItem.meta&&tagItem.meta.affix)"
            class="tag-icon"
            type="md-close"
            @click.stop="closeTag(tagItem,index)"
          />
        </div>
        <!-- </template> -->
        <!-- <router-link
          v-for="(tagItem,index) in visitedViews"
          :key="'tagView'+index"
          replace
          :to="tagItem.meta?tagItem.meta.toPath:tagItem.path"
        >
          <div
            v-if="tagItem.meta&&tagItem.meta.affix"
            class="tag-item"
            :class="isActive(tagItem)?'i-active':''"
            @click="activeTag(tagItem)"
          >
            <span>{{ tagItem.meta.title }}</span>
          </div>
          <div v-else class="tag-item" :class="isActive(tagItem)?'i-active':''">
            <span>{{ tagItem.meta.title }}</span>
            <Icon class="tag-icon" type="md-close" @click.stop="closeTag(tagItem,index)" />
          </div>
        </router-link>-->
      </div>
    </div>
    <span v-if="isOverflow" class="i-tags-view-icon i-hover" @click="scrollMove('right')">
      <Icon type="ios-arrow-forward" />
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import path from 'path'
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
      if (this.$store.state.tagsView.visitedViews.length > 0) this.initScroll()
      return this.$store.state.tagsView.visitedViews
    },
    frontMenuRoutes() {
      return this.$store.state.sidebar.frontMenuList // 权限下可展示的路由
    }
  },
  watch: {
    $route() {
      this.addTags()
      // this.moveToCurrentTag() // 后续完善的功能:在tags过多的情况下选中一个已经不在scroll-block里所展示的模块需要自动滚动到可以看到这个tags的地方
    }
  },
  mounted() {
    // 走sidebar 的frontlist 所有有权限才能查看的view ,把里面所有affix的view挑出来，后续再判断是否是affix，如果是就active中，其他的时候只要变化添加进去\
    this.initTagView()
    // this.addTags()
  },
  methods: {
    ...mapActions(['addView', 'delView', 'delVisitedView', 'changeActiveName']),
    initTagView() {
      const affixTags = this.filterAffixTag(this.frontMenuRoutes)
      affixTags.forEach((v) => this.addView(v))
    },
    filterAffixTag(routes, basePath = '/') {
      let tags = []
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTag(route.children, route.path)
          if (tempTags.length > 0) tags = [...tags, ...tempTags]
        }
      })
      return tags
    },
    isActive(tag) {
      if (tag.name === this.$route.name) return true
      else return false
    },
    addTags() {
      const { name } = this.$route
      if (name) this.addView(this.$route)
      return false
    },
    activeTag(router) {
      const path = router.meta ? router.meta.toPath : router.path
      if (this.$route.path !== path) this.$router.replace(path)
    },
    closeTag(route, index) {
      this.delView(route).then((data) => {
        if (this.isActive(route)) {
          this.$router.replace(data.visitedViews[index - 1].path)
        }
      })
    },
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
      display: inline-block;
      margin-right: 14px;
      height: 32px;
      line-height: 32px;
      padding: 0 12px;
      background-color: white;
      opacity: 0.8;
      cursor: pointer;
    }
    .i-active {
      opacity: 1;
    }
    .tag-icon {
      padding: 6px;
      margin-left: 6px;
      &:hover::before {
        content: '\F378';
      }
    }
  }
}
</style>
