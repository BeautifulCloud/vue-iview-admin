<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-15 16:19:16
 * @Description: table组件
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-16 17:32:14
-->
<template>
  <div class="l-table">
    <Checkbox-group v-model="tableSelectColumns" @on-change="resetTableColumns">
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
    <Table :data="tableData" :columns="tableSelectColumns" border />
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
        this.changeTableColumns({ key: this.pageName, arr: val })
      }
    }
  },
  mounted() {
    this.resetTableColumns()
  },
  methods: {
    ...mapActions(['changeTableColumns']),
    /**
     * @func generateTableColumns
     * @desc 通过colItems生成要展示的列
     * @param colItems Table要展示的列名数组
     * @return data 返回生成后的列
     */
    generateTableColumns(colItems) {},

    getTable2Columns() {
      const table2ColumnList = {
        name: {
          title: 'Name',
          key: 'name',
          fixed: 'left',
          width: 200,
          render: (h, params) => {
            const fav = this.tableData2[params.index].fav
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
          sortable: true
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
          title: '7, retained',
          key: 'day7',
          width: 150,
          sortable: true
        },
        day30: {
          title: '30, retained',
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
          sortable: true
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
      }

      const data = [table2ColumnList.name]

      this.tableColumns.forEach((col) => data.push(table2ColumnList[col]))

      return data
    },
    resetTableColumns() {
      this.tableColumns2 = this.getTable2Columns()
    },
    toggleFav(index) {
      this.tableData2[index].fav = this.tableData2[index].fav === 0 ? 1 : 0
    }
  }
}
</script>

<style lang="less" scoped>
.l-table {
}
</style>
