<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-25 16:54:14
 * @Description: sideBar收起来
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-14 22:17:03
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
            <template v-for="(childItem,index) in itemsData.children">
              <router-link :key="childItem.name" :to="childItem.meta.toPath">
                <DropdownItem
                  :name="itemsData.meta.name+'-'+index"
                  :selected="(itemsData.meta.name+'-'+index) === $store.state.sidebar.dropdownActiveName"
                  @click.native="menuClick(itemsData.meta.itemName,itemsData.meta.itemName+'-'+index)"
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
          <MenuItem
            :name="itemsData.children[0].name"
            :to="itemsData.children[0].meta.topath"
            @click.native="menuClick(itemsData.children[0].name,itemsData.children[0].name)"
          >
            <Icon :type="itemsData.children[0].meta.icon" />
          </MenuItem>
        </Tooltip>
      </template>
    </template>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
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
    ...mapActions(['changeActiveName']),
    hasOneChild(children = []) {
      if (children) {
        if (children.length > 1) return true
        else return false
      }
    },
    menuClick(menuItemName = 'home', dropdownItemName = '') {
      this.changeActiveName({ menuItemName, dropdownItemName })
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
