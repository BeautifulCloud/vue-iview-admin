<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-23 14:12:25
 * @Description:
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-30 09:11:37
-->
<template>
  <div class="l-table-footer">
    <div class="l-table-export">
      <Button
        v-if="$store.state.settings.showTableExport"
        type="default"
        size="default"
        @click="$emit('export-data',1)"
      >
        <Icon type="ios-download-outline" />导出全部数据
      </Button>
      <Button
        v-if="$store.state.settings.showTableSortExport"
        type="default"
        size="default"
        @click="$emit('export-data',2)"
      >
        <Icon type="ios-download-outline" />导出当前页数据
      </Button>
      <!-- <Button type="primary" size="default" @click="$emit('export-data',3)">
        <Icon type="ios-download-outline" />导出当前页展示数据
      </Button>-->
    </div>
    <div class="l-table-page">
      <Page
        :total="pageTotal"
        :page-size-opts="sizeOpts"
        :transfer="false"
        show-total
        show-elevator
        show-sizer
        @on-change="pageChange"
        @on-page-size-change="sizeChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableFooter',
  props: {
    pageTotal: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      size: 10,
      sizeOpts: [10, 20, 30, 50, 100, 1000]
    }
  },
  methods: {
    pageChange(pageNum) {
      this.$emit('change-paging', pageNum)
    },
    sizeChange(pageSize) {
      this.size = pageSize
      this.$emit('change-size', pageSize)
    }
  }
}
</script>

<style lang="less" scoped>
@l-table: l-table;
.@{l-table}-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // .@{l-table}-export {
  // }
  // .@{l-table}-page {
  // }
}
</style>
