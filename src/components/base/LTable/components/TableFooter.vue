<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-23 14:12:25
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-23 14:27:13
-->
<template>
  <div class="l-table-footer">
    <div class="l-table-export">
      <Button type="primary" size="large" @click="exportData(1)">
        <Icon type="ios-download-outline" />导出原始数据
      </Button>
      <Button type="primary" size="large" @click="exportData(2)">
        <Icon type="ios-download-outline" />导出过滤排序数据
      </Button>
      <Button type="primary" size="large" @click="exportData(3)">
        <Icon type="ios-download-outline" />导出自定义数据
      </Button>
    </div>
    <div class="l-table-page"></div>
  </div>
</template>

<script>
export default {
  name: 'TableFooter',
  data() {
    return {}
  },
  methods: {
    exportData() {}
  }
}
</script>

<style lang="less" scoped>
@l-table: l-table;
.@{l-tanle}-footer {
  .@{l-tanle}-export {
  }
  .@{l-tanle}-page {
  }
}
</style>
