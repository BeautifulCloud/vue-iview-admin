<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-31 14:48:05
 * @Description: poptip内的菜单内容
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-03 16:02:16
-->
<template>
  <div class="i-poptip-content">
    <Timeline>
      <TimelineItem v-for="menuItem in menuList" :key="menuItem.url">
        <Icon slot="dot" :type="menuItem.icon" />
        <p>{{ menuItem.name }}</p>
        <div v-if="hasChild(menuItem.children)" class="tags-container">
          <Tag
            v-for="(tagItem,index) in menuItem.children"
            :key="tagItem.url"
            class="i-tag i-hover"
            :class="{'i-active':(menuItem.itemName+'-'+index===activeTagname)}"
            @click.native="tagItemClick(menuItem.itemName,menuItem.itemName+'-'+index)"
          >
            <Icon type="ios-leaf" />
            {{ tagItem.name }}
          </Tag>
        </div>
        <div v-else>
          <Tag
            class="i-tag i-hover"
            :class="{'i-active':(menuItem.itemName===activeTagname)}"
            @click.native="tagItemClick(menuItem.itemName,menuItem.itemName)"
          >
            <Icon type="ios-leaf" />
            {{ menuItem.name }}
          </Tag>
        </div>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'PoptipContent',
  data() {
    return {}
  },
  computed: {
    activeTagname() {
      return this.$store.state.sidebar.dropdownActiveName
    },
    menuList() {
      return this.$store.state.sidebar.menuList
    }
  },
  methods: {
    ...mapActions(['changeActiveName']),
    hasChild(children = []) {
      if (children.length === 0) return false
      else return true
    },
    tagItemClick(menuItemName = 'home', dropdownItemName = '') {
      this.changeActiveName({ menuItemName, dropdownItemName })
    }
  }
}
</script>

<style lang="less" scoped>
.i-poptip-content {
  .i-tag {
    cursor: pointer;
  }
}
</style>
<style lang='less'>
.i-tag {
  &.i-active {
    .ivu-tag-text {
      color: white;
    }
  }
  &:hover {
    .ivu-tag-text {
      color: white;
    }
  }
}
</style>
