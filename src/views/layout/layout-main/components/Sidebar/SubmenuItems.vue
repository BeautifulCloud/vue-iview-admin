<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-25 16:54:00
 * @Description: sidebar展开
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-14 10:23:51
-->
<template>
  <div class="sidebar-submenu-block">
    <template v-for="itemsData in menuList">
      <template v-if="!itemsData.hidden">
        <template v-if="hasOneChild(itemsData.children)&&!(itemsData.alwaysShow||false)">
          <MenuItem
            :key="itemsData.children[0].name"
            :name="itemsData.children[0].name"
            :to="itemsData.children[0].meta.toPath"
            class="animate__animated animate__bounce"
            @click.native="dropdownItemClick(itemsData.children[0].name,itemsData.children[0].name)"
          >
            <Icon :type="itemsData.children[0].meta.icon" />
            {{ itemsData.children[0].meta.title }}
          </MenuItem>
        </template>
        <template v-else>
          <Submenu
            :key="itemsData.meta.name"
            :name="itemsData.meta.name"
            class="animate__animated animate__bounce"
          >
            <template slot="title">
              <Icon :type="itemsData.meta.icon" />
              {{ itemsData.meta.title }}
            </template>
            <MenuItem
              v-for="(childItem,index) in itemsData.children"
              :key="childItem.name"
              :name="itemsData.meta.name+'-'+index"
              :to="childItem.meta.toPath"
              @click.native="dropdownItemClick(itemsData.meta.name,itemsData.meta.name+'-'+index)"
            >{{ childItem.meta.title }}</MenuItem>
          </Submenu>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SubmenuItems',
  props: {
    // menuList: {
    //   type: Array,
    //   default() {
    //     return []
    //   }
    // }
  },
  data() {
    return {}
  },
  computed: {
    menuList() {
      return this.$store.getters.frontMenuList
    }
  },
  methods: {
    ...mapActions(['changeActiveName']),
    hasOneChild(children = []) {
      if (children) {
        if (children.length > 1) return false
        else return true
      }
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
