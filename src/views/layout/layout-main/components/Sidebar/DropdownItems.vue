<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-25 16:54:14
 * @Description: sideBar收起来
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-03 15:50:15
-->
<template>
  <div class="sidebar-dropdown-block">
    <template v-for="itemsData in menuList">
      <template v-if="hasChild(itemsData.children)">
        <Dropdown
          :key="itemsData.itemName"
          placement="right-start"
          :transfer="true"
          class="animate__animated animate__bounce"
        >
          <MenuItem :name="itemsData.itemName">
            <Icon :type="itemsData.icon" />
          </MenuItem>
          <DropdownMenu slot="list">
            <template v-for="(childItem,index) in itemsData.children">
              <router-link :key="childItem.itemName" :to="childItem.path">
                <DropdownItem
                  :name="itemsData.itemName+'-'+index"
                  :selected="(itemsData.itemName+'-'+index) === $store.state.sidebar.dropdownActiveName"
                  @click.native="menuClick(itemsData.itemName,itemsData.itemName+'-'+index)"
                >{{ childItem.name }}</DropdownItem>
              </router-link>
            </template>
          </DropdownMenu>
        </Dropdown>
      </template>
      <template v-else>
        <Tooltip
          :key="itemsData.itemName"
          :content="itemsData.name"
          :transfer="true"
          placement="right"
          class="animate__animated animate__bounce"
        >
          <MenuItem
            :name="itemsData.itemName"
            :to="itemsData.path"
            @click.native="menuClick(itemsData.itemName,itemsData.itemName)"
          >
            <Icon :type="itemsData.icon" />
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
    menuClick(menuItemName = 'home', dropdownItemName = '') {
      this.changeActiveName({ menuItemName, dropdownItemName })
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar-dropdown-block {
  max-width: 78px;
  .ivu-icon {
    font-size: x-large;
  }
}
</style>
