<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-25 16:54:00
 * @Description: sidebar展开
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-10-18 13:15:33
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
              v-for="childItem in itemsData.children"
              :key="childItem.name"
              :name="childItem.name"
              :to="childItem.meta.toPath"
            >{{ childItem.meta.title }}</MenuItem>
          </Submenu>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SubmenuItems',
  props: {},
  data() {
    return {}
  },
  computed: {
    menuList() {
      return this.$store.getters.frontMenuList
    }
  },
  methods: {
    hasOneChild(children = []) {
      if (children) {
        if (children.length > 1) return false
        else return true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar-submenu-block {
  min-width: max-content;
}
</style>
