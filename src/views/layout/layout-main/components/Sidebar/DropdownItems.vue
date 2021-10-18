<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-25 16:54:14
 * @Description: sideBar收起来
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-10-18 13:15:46
-->
<template>
  <div class="sidebar-dropdown-block">
    <template v-for="itemsData in menuList">
      <template v-if="hasOneChild(itemsData.children)||itemsData.alwaysShow">
        <Dropdown
          :key="itemsData.meta.name"
          placement="right-start"
          :transfer="true"
          class="animate__animated animate__bounce"
        >
          <MenuItem :name="itemsData.meta.name" class="dropdown-block-menu-item">
            <Icon :type="itemsData.meta.icon" class="menu-item-icon" />.
          </MenuItem>
          <DropdownMenu slot="list">
            <template v-for="childItem in itemsData.children">
              <router-link :key="childItem.name" :to="childItem.meta.toPath">
                <DropdownItem
                  :name="childItem.name"
                  :selected="childItem.name === $route.name"
                >{{ childItem.meta.title }}</DropdownItem>
              </router-link>
            </template>
          </DropdownMenu>
        </Dropdown>
      </template>
      <template v-else>
        <Tooltip
          :key="itemsData.children[0].name"
          :content="itemsData.children[0].meta.title"
          :transfer="true"
          placement="right"
          class="animate__animated animate__bounce"
        >
          <MenuItem :name="itemsData.children[0].name" :to="itemsData.children[0].meta.topath">
            <Icon :type="itemsData.children[0].meta.icon" />
          </MenuItem>
        </Tooltip>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: 'DropdownItems',
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
        if (children.length > 1) return true
        else return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar-dropdown-block {
  max-width: 78px;
  .dropdown-block-menu-item {
    .menu-item-icon {
      margin: 0;
    }
  }
  .ivu-icon {
    font-size: x-large;
  }
}
</style>
