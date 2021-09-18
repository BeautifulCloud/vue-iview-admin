<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-15 10:15:03
 * @Description: table 组件示例
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-18 16:30:55
-->
<template>
  <div class="l-view l-components-table">
    <l-table
      ref="LTable"
      :page-name="$options.name"
      :table-columns="tableColumns"
      :table-data="tableData"
      :table-columns-rule="tableColumnsRule"
      @refresh-table="refreshTable"
    />
  </div>
</template>

<script>
import LTable from '@/components/base/LTable/index.vue'
export default {
  name: 'TableUse',
  components: { LTable },
  data() {
    return {
      tableColumns: ['show', 'weak', 'signin', 'click', 'active', 'day7', 'day30', 'tomorrow', 'day', 'week', 'month'],
      // table表格列展示规则 其中key的index、selection为关键词代表序号和复选框
      tableColumnsRule: {
        index: {
          type: 'index',
          width: 60,
          align: 'center'
        },
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
      forNum: 12
    }
  },
  computed: {
    tableData() {
      const data = []
      function getNum() {
        return Math.floor(Math.random() * 10000 + 1)
      }
      for (let i = 0; i < this.forNum; i++) {
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
  },
  create() {},
  methods: {
    refreshTable() {
      setTimeout(() => {
        this.forNum++
        this.$refs.LTable.lodingEnd()
      }, 1500)
    }
  }
}
</script>

<style lang="less" scoped>
.l-components-table {
}
</style>
