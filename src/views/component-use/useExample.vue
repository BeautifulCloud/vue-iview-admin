<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-15 10:15:03
 * @Description: table 组件示例
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-30 09:09:08
-->
<template>
  <div class="l-view l-components-table">
    <l-table
      ref="LTable"
      :table-opts="tableOpts"
      @refresh-table="refreshTable"
      @table-highlight-change="tableHighlightChange"
      @table-select-change="tableSelectChange"
      @table-unselect-change="tableUnselectChange"
      @table-select-all="tableSelectAll"
      @table-unselect-all="tableUnselectAll"
      @table-selection-change="tableSelectionChange"
      @table-sort-change="tableSortChange"
      @table-filter-change="tableFilterChange"
      @table-row-click="tableRowClick"
      @action-check="actionCheck"
    />
  </div>
</template>
// 使用后端分页需要添加 :java-paging="true" :page-total="" @change-paging="" @change-size=""
<script>
import LTable from '@/components/base/LTable/index.vue'
export default {
  name: 'UseExample',
  components: { LTable },
  data() {
    return {
      tableOpts: {
        tableColumns: ['show', 'weak', 'signin', 'click', 'active', 'day7', 'day30', 'tomorrow', 'day', 'week', 'month'],
        // table表格列展示规则 其中key的index、selection为关键词代表序号和复选框
        tableColumnsRule: {
          // 添加下面对象展示table排序
          index: {
            type: 'index',
            width: 60,
            align: 'center'
          },
          // 添加下面对象展示table多选
          selection: {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          name: {
            title: 'Name',
            key: 'name',
            fixed: 'left',
            width: 200,
            render: (h, params) => {
              const fav = this.tableData[params.index].fav
              const style = fav === 0 ? { cursor: 'pointer' } : { cursor: 'pointer', color: '#f50' }
              return h('div', [
                h('Icon', {
                  style: style,
                  props: {
                    type: fav === 0 ? 'ios-star-outline' : 'ios-star'
                  },
                  nativeOn: {
                    click: () => {
                      this.toggleFav(params.index)
                    }
                  }
                }),
                h('span', ' ' + params.row.name)
              ])
            }
          },
          show: {
            title: 'Show',
            key: 'show',
            width: 150,
            sortable: true, // 添加table开启前端当前页排序
            filters: [
              {
                label: '大于 3000',
                value: 1
              },
              {
                label: '小于 3000',
                value: 2
              }
            ],
            filterMultiple: false,
            // 前端过滤 会调起 tableFilterChange()
            filterMethod(value, row) {
              if (value === 1) {
                return row.show > 3000
              } else if (value === 2) {
                return row.show < 3000
              }
            }
            // 后端过滤 会调起 tableFilterChange() 会覆盖前端过滤
            // filterRemote(value, row) {
            //   console.log(value, row)
            // }
          },
          weak: {
            title: 'Weak',
            key: 'weak',
            width: 150,
            sortable: true
          },
          signin: {
            title: 'Signin',
            key: 'signin',
            width: 150,
            sortable: true
          },
          click: {
            title: 'Click',
            key: 'click',
            width: 150,
            sortable: true
          },
          active: {
            title: 'Active',
            key: 'active',
            width: 150,
            sortable: true
          },
          day7: {
            title: '7retained',
            key: 'day7',
            width: 150,
            sortable: true
          },
          day30: {
            title: '30retained',
            key: 'day30',
            width: 150,
            sortable: true
          },
          tomorrow: {
            title: 'The next day left',
            key: 'tomorrow',
            width: 150,
            sortable: true
          },
          day: {
            title: 'Day Active',
            key: 'day',
            width: 150,
            sortable: true,
            fixed: 'right'
          },
          week: {
            title: 'Week Active',
            key: 'week',
            width: 150,
            sortable: true
          },
          month: {
            title: 'Month Active',
            key: 'month',
            width: 150,
            sortable: true
          }
        },
        tableData: [],
        hasActions: true, // 默认为true，如果table不需要操作项则设为false
        actionWidth: 280, // 操作列的宽度，默认150,按需调整,一个字14,一个按钮宽度（字数*14+12）,actionWidth计算（按钮宽度总和+36）
        actions: [
          {
            action: 'check',
            name: '查看',
            icon: 'ios-paper'
          },
          {
            action: 'edit',
            name: '编辑',
            icon: 'ios-brush'
          },
          {
            action: 'delete',
            name: '删除',
            icon: 'md-trash'
          },
          {
            action: 'pass',
            name: '通过',
            icon: 'md-checkmark-circle'
          },
          {
            action: 'reject',
            name: '驳回',
            icon: 'md-close-circle'
          }
        ]
      },
      forNum: 12
    }
  },
  watch: {
    forNum(val) {
      this.getTableData()
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    // 生成测试数据方法
    getTableData() {
      const data = []
      for (let i = 0; i < this.forNum; i++) {
        data.push({
          name: 'Name ' + (i + 1),
          fav: 0,
          show: this.getNum(),
          weak: this.getNum(),
          signin: this.getNum(),
          click: this.getNum(),
          active: this.getNum(),
          day7: this.getNum(),
          day30: this.getNum(),
          tomorrow: this.getNum(),
          day: this.getNum(),
          week: this.getNum(),
          month: this.getNum()
        })
      }
      this.tableOpts.tableData = data
    },
    // 生成测试数据方法
    getNum() {
      return Math.floor(Math.random() * 10000 + 1)
    },
    // 刷新 Table 数据,模拟向后端请求数据，每次点击添加一条数据
    refreshTable() {
      setTimeout(() => {
        this.forNum++
        this.$refs.LTable.lodingEnd()
      }, 1500)
    },
    /**
     * @func tableHighlightChange
     * @desc 表格高亮行变化时触发
     * @param {oldRow(上一次高亮的数据),newRow(当前高亮行的数据)}
     */
    tableHighlightChange(data) {
      console.log(data.newRow, data.oldRow)
    },
    /**
     * @func tableSelectChange
     * @desc 表格选中行变化时触发
     * @param {selectList(已选中的数据),select(当前点击选中的数据)}
     */
    tableSelectChange(data) {
      console.log(data.selectList, data.select)
    },
    /**
     * @func tableUnselectChange
     * @desc 表格取消选中行变化时触发
     * @param {selectList(已选中的数据),select(当前点击选中的数据)}
     */
    tableUnselectChange(data) {
      console.log(data.selectList, data.select)
    },
    /**
     * @func tableSelectAll
     * @desc 表格全选事件触发
     * @param {selectList(已选中的数据)}
     */
    tableSelectAll(data) {
      console.log(data.selectList)
    },
    /**
     * @func tableUnselectAll
     * @desc 表格取消全选事件触发
     * @param {selectList(已选中的数据)}
     */
    tableUnselectAll(data) {
      console.log(data.selectList)
    },
    /**
     * @func tableAllselectChange
     * @desc 选中项发生变化时触发
     * @param {selectList(已选中的数据)}
     */
    tableSelectionChange(data) {
      console.log(data.selectList)
    },
    /**
     * @func tableSortChange
     * @desc 点击排序时触发
     * @param {column(当前列数据),key(排序的列标识),order(排序的顺序，值为 asc 或 desc)}
     */
    tableSortChange(data) {
      console.log(data.column, data.key, data.order)
    },
    /**
     * @func tableFilterChange
     * @desc 点击筛选时触发
     * @param {data(当前列数据)}
     */
    tableFilterChange(data) {
      console.log(data)
    },
    /**
     * @func tableRowClick
     * @desc 单击某一行时触发
     * @param {row(当前行数据),index(当前行索引)}
     */
    tableRowClick(data) {
      console.log(data.row, data.index)
    },
    /**
     * @func actionCheck
     * @desc 表格操作的自定义方法，其他操作使用方法类似，此处举例一个
     * @param {}
     * @return {}
     */
    actionCheck(row, index) {
      this.$info(row.index)
      console.log(row, index)
      this.$Message.success({ background: false, content: '这是一条成功通知' })
    }
  }
}
</script>

<style lang="less" scoped>
.l-components-table {
}
</style>
