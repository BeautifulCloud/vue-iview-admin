<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-15 16:19:16
 * @Description: table组件
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-17 10:48:34
-->
<template>
  <div class="l-table">
    <Checkbox-group v-model="tableSelectColumns">
      <Checkbox label="show">Show</Checkbox>
      <Checkbox label="weak">Weak</Checkbox>
      <Checkbox label="signin">Signin</Checkbox>
      <Checkbox label="click">Click</Checkbox>
      <Checkbox label="active">Active</Checkbox>
      <Checkbox label="day7">7, retained</Checkbox>
      <Checkbox label="day30">30, retained</Checkbox>
      <Checkbox label="tomorrow">The next day left</Checkbox>
      <Checkbox label="day">Day Active</Checkbox>
      <Checkbox label="week">Week Active</Checkbox>
      <Checkbox label="month">Month Active</Checkbox>
    </Checkbox-group>
    <Table
      :data="tableData"
      :columns="actualTableColumns"
      :border="$store.state.settings.showTableBorder"
      :stripe="$store.state.settings.showTableStripe"
      :show-header="$store.state.settings.showTableHeader"
      :size="$store.state.settings.showTableSize"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'LTable',
  props: {
    pageName: {
      type: String,
      default() {
        return ''
      }
    },
    tableColumnsRule: {
      type: Object,
      default() {
        return {}
      }
    },
    tableColumns: {
      type: Array,
      default() {
        return []
      }
    },
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getTableSelectColumns']),
    tableSelectColumns: {
      // 改变和存储用户设置要展示的列
      get() {
        const selectColumns = this.getTableSelectColumns(this.pageName)
        if (typeof selectColumns !== 'undefined') {
          return selectColumns
        } else {
          this.changeTableColumns({ key: this.pageName, arr: this.tableColumns })
          return this.tableColumns
        }
      },
      set(val) {
        if (this.$store.state.settings.fixTableColumns) {
          const fixColumns = []
          this.tableColumns.forEach((col) => {
            val.forEach((newCol) => {
              if (newCol === col) fixColumns.push(newCol)
            })
          })
          this.changeTableColumns({ key: this.pageName, arr: fixColumns })
        } else this.changeTableColumns({ key: this.pageName, arr: val })
      }
    },
    actualTableColumns() {
      // 通过tableColumnsRule 和 tableSelectColumns 生成要展示的列
      const data = []
      if (Object.prototype.hasOwnProperty.call(this.tableColumnsRule, 'index')) data.push(this.tableColumnsRule.index)
      if (Object.prototype.hasOwnProperty.call(this.tableColumnsRule, 'selection')) data.push(this.tableColumnsRule.selection)
      this.tableSelectColumns.forEach((col) => {
        data.push(this.tableColumnsRule[col])
      })
      return data
    }
  },
  methods: {
    ...mapActions(['changeTableColumns'])
  }
}
</script>

<style lang="less" scoped>
.l-table {
}
</style>
