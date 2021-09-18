<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-15 16:19:16
 * @Description: table组件 这个组件父级必须是display:flex
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-18 17:29:12
-->
<template>
  <div class="l-table">
    <table-operations
      v-if="$store.state.settings.showTableOperation"
      :page-name="pageName"
      :dropdown-data="tableColumns"
      @refresh-table="refreshTable"
    />
    <div ref="tableMain" class="l-table-main">
      <Table
        :loading="tableLoading"
        :data="tableData"
        :max-height="tableHeight"
        :columns="actualTableColumns"
        :border="$store.state.settings.showTableBorder"
        :stripe="$store.state.settings.showTableStripe"
        :show-header="$store.state.settings.showTableHeader"
        :size="$store.state.settings.showTableSize"
        :highlight-row="true"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TableOperations from './components/TableOperations.vue'
export default {
  name: 'LTable',
  components: { TableOperations },
  props: {
    pageName: {
      type: String,
      default() {
        return ''
      }
    },
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    tableColumns: {
      type: Array,
      default() {
        return []
      }
    },
    tableColumnsRule: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      tableHeight: 0
    }
  },
  computed: {
    ...mapGetters(['getTableSelectColumns']),
    tableSelectColumns() {
      const selectColumns = this.getTableSelectColumns(this.pageName)
      if (typeof selectColumns !== 'undefined') {
        return selectColumns
      } else {
        this.changeTableColumns({ key: this.pageName, arr: this.tableColumns })
        return this.tableColumns
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
  updated() {
    console.log(this.$refs.tableMain.offsetHeight)
    this.tableHeight = this.$refs.tableMain.offsetHeight
  },
  methods: {
    ...mapActions(['changeTableColumns']),
    lodingStart() {
      this.tableLoading = true
    },
    lodingEnd() {
      this.tableLoading = false
    },
    refreshTable() {
      this.tableLoading = true
      this.$emit('refresh-table')
    }
  }
}
</script>

<style lang="less" scoped>
.l-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  &-main {
    flex: auto;
  }
}
</style>
