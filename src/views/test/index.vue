<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-01 09:51:27
 * @Description: 测试页
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-10 14:26:37
-->
<template>
  <div>
    <h1>test page</h1>
  </div>
</template>

<script>
export default {
  name: 'TestPage',
  data() {
    return {}
  }
}
</script>
 <script>
// SubmenuItems.vue 有未做完的东西，思路在这里
// <template v-if="hasOneChild(itemsData.children)">
//       <Submenu
//         :key="itemsData.name"
//         :name="itemsData.name"
//         class="animate__animated animate__bounce"
//       >
//         <!-- TODO:判断为无限嵌套导航栏准备 -->
//         <!-- <template v-if="itemsData.icon!==''" slot="title"> -->
//         <Icon :type=" itemsData.meta.icon" />
//         {{ itemsData.meta.title }}
//         <!-- </template> -->
//         <MenuItem
//           v-for="(childItem,index) in itemsData.children"
//           :key="childItem.name"
//           :name="itemsData.name+'-'+index"
//           :to="childItem.path"
//           @click.native="dropdownItemClick(itemsData.name,itemsData.name+'-'+index)"
//         >{{ childItem.name }}</MenuItem>
//       </Submenu>
//       <!-- TODO:限嵌套导航栏
//       <submenu-items
//       v-for="(item,index) in itemsData.children"
//       :key="item.itemName"
//       :items-data="item"
//       />-->
//     </template>
//     <template v-else>
//       <MenuItem
//         :key="itemsData.children[0].name"
//         :name="itemsData.children[0].name"
//         :to="itemsData.children[0].path"
//         class="animate__animated animate__bounce"
//         @click.native="dropdownItemClick(itemsData.children[0].name,itemsData.children[0].name)"
//       >
//         <Icon :type="itemsData.icon" />
//         {{ itemsData.children[0].meta.title }}
//       </MenuItem>
//     </template>
</script>
<style lang="less" scoped>
</style>
