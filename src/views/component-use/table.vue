<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-15 10:15:03
 * @Description: table 组件示例
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-16 17:31:27
-->
<template>
  <div>
    <l-table :page-name="$options.name" :table-columns="tableColumns" :table-data="tableData" />
  </div>
</template>

<script>
import LTable from '@/components/base/table/index.vue'
export default {
  name: 'TableUse',
  components: { LTable },
  data() {
    return {
      tableColumns: ['show', 'weak', 'signin', 'click', 'active', 'day7', 'day30', 'tomorrow', 'day', 'week', 'month'],
      tableData: this.createTableData()
    }
  },
  computed: {},
  create() {},
  methods: {
    createTableData() {
      const data = []
      function getNum() {
        return Math.floor(Math.random() * 10000 + 1)
      }
      for (let i = 0; i < 10; i++) {
        data.push({
          name: 'Name ' + (i + 1),
          fav: 0,
          show: getNum(),
          weak: getNum(),
          signin: getNum(),
          click: getNum(),
          active: getNum(),
          day7: getNum(),
          day30: getNum(),
          tomorrow: getNum(),
          day: getNum(),
          week: getNum(),
          month: getNum()
        })
      }
      return data
    }
  }
}
</script>

<style lang="less" scoped>
</style>
