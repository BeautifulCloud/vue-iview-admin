<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-25 16:54:00
 * @Description: sidebar展开
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-03 15:56:24
-->
<template>
  <div class="sidebar-submenu-block">
    <template v-for="itemsData in menuList">
      <template v-if="hasChild(itemsData.children)">
        <Submenu
          :key="itemsData.itemName"
          :name="itemsData.itemName"
          class="animate__animated animate__bounce"
        >
          <template v-if="itemsData.icon!==''" slot="title">
            <Icon :type="itemsData.icon" />
            {{ itemsData.name }}
          </template>
          <MenuItem
            v-for="(childItem,index) in itemsData.children"
            :key="childItem.itemName"
            :name="itemsData.itemName+'-'+index"
            :to="childItem.path"
            @click.native="dropdownItemClick(itemsData.itemName,itemsData.itemName+'-'+index)"
          >{{ childItem.name }}</MenuItem>
        </Submenu>
        <!-- TODO:无限嵌套导航栏
        <submenu-items
        v-for="(item,index) in itemsData.children"
        :key="item.itemName"
        :items-data="item"
        />-->
      </template>
      <template v-else>
        <MenuItem
          :key="itemsData.itemName"
          :name="itemsData.itemName"
          :to="itemsData.path"
          class="animate__animated animate__bounce"
          @click.native="dropdownItemClick(itemsData.itemName,itemsData.itemName)"
        >
          <Icon :type="itemsData.icon" />
          {{ itemsData.name }}
        </MenuItem>
      </template>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SubmenuItems',
  props: {
    menuList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions(['changeActiveName']),
    hasChild(children = []) {
      if (children.length === 0) return false
      else return true
    },
    dropdownItemClick(menuItemName = 'home', dropdownItemName = '') {
      this.changeActiveName({ menuItemName, dropdownItemName })
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar-submenu-block {
  min-width: max-content;
}
</style>
