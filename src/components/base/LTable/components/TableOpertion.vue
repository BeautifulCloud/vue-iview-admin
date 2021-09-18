<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-17 15:28:41
 * @Description: TableOpertion
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-17 15:40:41
-->
<template>
  <div class="l-table-opertion">
    <Tooltip content="刷新" placement="top">
      <Icon type="md-refresh" />
    </Tooltip>
    <Tooltip content="全屏" placement="top">
      <!-- <Icon v-if="isScreenfull" type="md-contract" /> -->
      <!-- <Icon v-else type="md-expand" /> -->
    </Tooltip>
    <Dropdown>
      <Tooltip content="列设置" placement="top">
        <Icon type="md-options" />
      </Tooltip>
      <DropdownMenu slot="list">
        <Checkbox-group v-model="tableSelectColumns">
          <DropdownItem v-for="item in tableColumns" :key="item">
            <Checkbox :label="item">{{ item }}</Checkbox>
          </DropdownItem>
        </Checkbox-group>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TableOpertion',
  props: {
    tableSelectColumns: {
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
    }
  },
  data() {
    return {}
  },
  computed: {
    checkGroupData: {
      get() {
        return this.tableSelectColumns
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
    }
  },
  methods: {
    ...mapActions(['changeTableColumns'])
  }
}
</script>

<style lang="less" scoped>
</style>
