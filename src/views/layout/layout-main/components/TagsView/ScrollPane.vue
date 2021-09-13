<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-02 08:53:20
 * @Description: 滚动的容器
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-10 14:26:50
-->
<template>
  <div ref="viewScroll" class="i-tags-view-scroll">
    <router-link to="/home">
      <Tag type="border" class="tag-item">首页</Tag>
    </router-link>
    <router-link
      v-for="(tagItem,index) in $store.state.tagsViewList"
      :key="'tagView'+index"
      :to="tagItem.path"
    >
      <Tag type="border" class="tag-item">{{ tagItem.name }}</Tag>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ScrollPane',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
</style>
