<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-15 16:19:16
 * @Description: table组件 这个组件父级必须是display:flex
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-29 17:19:09
-->
<template>
  <div class="l-table">
    <table-operations
      v-if="$store.state.settings.showTableOperation"
      :vue-name="$parent.$options.name"
      :dropdown-data="tableOpts.tableColumns"
      @refresh-table="refreshTable"
      @screenfull-change="screenfullChange"
    />
    <div ref="tableMain" class="l-table-main">
      <Table
        ref="table"
        :loading="tableLoading"
        :data="tablePageDatas"
        :max-height="tableHeight"
        :columns="actualTableColumns"
        :border="$store.state.settings.showTableBorder"
        :stripe="$store.state.settings.showTableStripe"
        :show-header="$store.state.settings.showTableHeader"
        :resizable="$store.state.settings.tableResizable"
        :highlight-row="true"
        :size="$store.state.settings.tableSize"
        @on-curent-change="(currentRow,oldCurrentRow)=>$emit('table-highlight-change',{newRow:currentRow,oldRow:oldCurrentRow})"
        @on-select="(selection,row)=>$emit('table-select-change',{selectList:selection,select:row})"
        @on-select-cancel="(selection,row)=>$emit('table-unselect-change',{selectList:selection,select:row})"
        @on-select-all="(selection)=>$emit('table-select-all',{selectList:selection})"
        @on-select-all-cancel="(selection)=>$emit('table-unselect-all',{selectList:selection})"
        @on-selection-change="(selection)=>$emit('table-selection-change',{selectList:selection})"
        @on-sort-change="(column,key,order)=>$emit('table-sort-change',{column,key,order})"
        @on-filter-change="(data)=>$emit('table-filter-change',data)"
        @on-row-click="(row,index)=>$emit('table-row-click',{row,index})"
      >
        <template slot="actions" slot-scope="{ row, index }">
          <template v-if="$store.state.settings.tableOperation=='tradition'">
            <Button
              v-for="item in tableOpts.actions"
              :key="item.action"
              type="primary"
              size="small"
              ghost
              style="margin-right: 3px"
              class="action-tradition"
              @click="$emit('action-'+item.action,row,index)"
            >{{ item.name }}</Button>
          </template>
          <template v-if="$store.state.settings.tableOperation=='button'">
            <template v-for="item in tableOpts.actions">
              <Button
                :key="item.action"
                :type="getBtnType(item.action)"
                size="small"
                style="margin-right: 3px"
                @click="$emit('action-check',row,index)"
              >{{ item.name }}</Button>
            </template>
          </template>
          <template v-if="$store.state.settings.tableOperation=='simple'">
            <template v-for="item in tableOpts.actions">
              <Tooltip :key="item.action" :content="item.name" placement="top">
                <Button
                  :type="getBtnType(item.action)"
                  :icon="item.icon"
                  size="small"
                  style="margin: 0 7px"
                  @click="$emit('action-check',row,index)"
                />
              </Tooltip>
            </template>
          </template>
        </template>
      </Table>
    </div>
    <table-footer
      :page-total="getPageTotal()"
      @change-paging="changePaging"
      @change-size="changeSize"
      @export-data="exportData"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TableOperations from './components/TableOperations.vue'
import TableFooter from './components/TableFooter.vue'
export default {
  name: 'LTable',
  components: { TableOperations, TableFooter },
  props: {
    tableOpts: {
      type: Object,
      default() {
        return {
          hasActions: true,
          tableData: [],
          tableColumns: [],
          tableColumnsRule: {},
          actionWidth: '150', // 操作列的宽度，默认150按需调整
          actions: []
        }
      }
    },
    // 使用后端分页需要传递的参数，默认false使用前端分页
    javaPaging: {
      type: Boolean,
      default() {
        return false
      }
    },
    // 使用后端分页需要传递的参数-数据总条数
    pageTotal: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      tableHeight: 0,
      pageNum: 1,
      pageSize: 10
    }
  },
  computed: {
    ...mapGetters(['getTableSelectColumns']),
    tableSelectColumns() {
      const parentName = this.$parent.$options.name
      const selectColumns = this.getTableSelectColumns(parentName)
      if (typeof selectColumns !== 'undefined') return selectColumns
      else {
        this.changeTableColumns({ key: parentName, arr: this.tableOpts.tableColumns })
        return this.tableOpts.tableColumns
      }
    },
    redefineTableColumnsRule() {
      const redefineRule = this.tableOpts.tableColumnsRule
      if (this.$store.state.settings.tableResizable) {
        Object.keys(redefineRule).forEach((v) => {
          Object.assign(redefineRule[v], { resizable: true, ellipsis: true, tooltip: false })
        })
        return redefineRule
      } else {
        Object.keys(redefineRule).forEach((v) => {
          Object.assign(redefineRule[v], { resizable: false, ellipsis: true, tooltip: false })
        })
        return redefineRule
      }
    },
    actualTableColumns() {
      // 通过tableColumnsRule 和 tableSelectColumns 生成要展示的列
      const data = []
      if (Object.prototype.hasOwnProperty.call(this.redefineTableColumnsRule, 'index')) data.push(this.redefineTableColumnsRule.index)
      if (Object.prototype.hasOwnProperty.call(this.redefineTableColumnsRule, 'selection')) data.push(this.redefineTableColumnsRule.selection)
      this.tableSelectColumns.forEach((col) => {
        data.push(this.redefineTableColumnsRule[col])
      })
      if (this.tableOpts.hasActions || typeof this.tableOpts.hasActions === 'undefined') {
        data.push({
          title: '操作',
          slot: 'actions',
          width: this.tableOpts.actionWidth,
          align: 'center',
          fixed: 'right'
        })
      }
      return data
    },
    tablePageDatas() {
      if (this.javaPaging) return this.tableOpts.tableData
      else {
        const total = this.tableOpts.tableData.length
        const pageStart = this.pageSize * (this.pageNum - 1)
        const pageEnd = this.pageSize * this.pageNum
        if (pageEnd <= total) return this.tableOpts.tableData.slice(pageStart, pageEnd)
        else return this.tableOpts.tableData.slice(pageStart)
      }
    }
  },
  watch: {
    '$store.state.settings.showTagsView'() {
      this.tableHeight = 1
    },
    '$store.state.settings.showTableOperation'() {
      this.tableHeight = 1
    },
    '$store.state.settings.tableResizable'(val) {
      // const newData = JSON.parse(JSON.stringify(this.tableOpts.tableColumnsRule))
      // 考虑是否需要取消多次响应式去做，防止重复渲染
      if (val) {
        Object.keys(this.tableOpts.tableColumnsRule).forEach((v) => {
          this.$set(this.tableOpts.tableColumnsRule[v], 'resizable', true)
        })
      } else {
        Object.keys(this.tableOpts.tableColumnsRule).forEach((v) => {
          this.$set(this.tableOpts.tableColumnsRule[v], 'resizable', false)
        })
      }
    }
  },
  updated() {
    this.tableHeight = this.$refs.tableMain.offsetHeight
  },
  methods: {
    ...mapActions(['changeTableColumns']),
    exportData(type) {
      if (type === 1) {
        const tableColumnList = []
        this.tableOpts.tableColumns.forEach((col) => {
          tableColumnList.push(this.redefineTableColumnsRule[col])
        })
        this.$refs.table.exportCsv({
          filename: '原始数据',
          columns: tableColumnList,
          data: this.tableOpts.tableData
        })
      } else if (type === 2) {
        this.$refs.table.exportCsv({
          filename: '筛选过滤数据',
          original: false
        })
      } else if (type === 3) {
        const tableColumnList = []
        this.tableSelectColumns.forEach((col) => {
          tableColumnList.push(this.redefineTableColumnsRule[col])
        })
        this.$refs.table.exportCsv({
          filename: '当前页数据',
          original: false,
          columns: tableColumnList,
          data: this.tablePageDatas
        })
      }
    },
    lodingStart() {
      this.tableLoading = true
    },
    lodingEnd() {
      this.tableLoading = false
    },
    /**
     * @func refreshTable
     * @desc 刷新表格触发
     */
    refreshTable() {
      this.tableLoading = true
      this.$emit('refresh-table')
    },
    /**
     * @func screenfullChange
     * @desc 全屏状态改变触发
     */
    screenfullChange(data) {
      console.log(data)
      this.tableHeight = 1
    },
    /**
     * @func getPageTotal
     * @desc 通过判断是否开启前端分页进行不同的数据长度取值
     * @return {数据总长度}
     */
    getPageTotal() {
      if (this.javaPaging) return this.pageTotal
      else return this.tableOpts.tableData.length
    },
    /**
     * @func changePaging
     * @desc 通过判断是否开启前端分页来区分修改table展示数据的方式
     */
    changePaging(num) {
      if (this.javaPaging) this.$emit('change-paging', num)
      else this.pageNum = num
    },
    changeSize(size) {
      if (this.javaPaging) this.$emit('change-size', size)
      else this.pageSize = size
    },
    getBtnType(action) {
      let btnType = ''
      switch (action) {
        case 'check':
          btnType = 'info'
          break
        case 'edit':
          btnType = 'primary'
          break
        case 'delete':
          btnType = 'error'
          break
        case 'pass':
          btnType = 'success'
          break
        case 'reject':
          btnType = 'warning'
          break
      }
      return btnType
    }
  }
}
</script>

<style lang="less" scoped>
.l-table {
  flex: auto;
  display: flex;
  flex-direction: column;
  &-main {
    flex: 1;
    .action-tradition {
      border: none;
    }
  }
}
</style>
