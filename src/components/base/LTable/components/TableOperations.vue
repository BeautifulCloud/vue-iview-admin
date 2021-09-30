<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-17 18:22:43
 * @Description: TableOperation
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-30 08:52:30
-->
<template>
  <div v-if="$store.state.settings.showTableOperation" class="l-table-operation">
    <Tooltip content="刷新" placement="top" class="l-table-tooltip" @click.native="refreshTable">
      <Icon type="md-refresh" :size="19" />
    </Tooltip>
    <Tooltip content="全屏" placement="top" class="l-table-tooltip" @click.native="fullscreen">
      <Icon :type="'md-'+(isScreenfull?'contract':'expand')" :size="18" />
    </Tooltip>
    <Dropdown
      trigger="custom"
      :transfer="false"
      :visible="visible"
      class="l-table-dropdown"
      @on-clickoutside="clickoutside"
    >
      <Tooltip
        content="列设置"
        placement="top"
        class="l-table-tooltip"
        @click.native="visible=!visible"
      >
        <Icon type="md-options" :size="18" />
      </Tooltip>
      <DropdownMenu ref="dropdownMenuRef" slot="list" class="l-table-dropdownMenu">
        <Checkbox-group v-model="checkboxData" class="l-table-checkbox-group">
          <DropdownItem v-for="item in dropdownData" :key="item" class="l-table-dropdownItem">
            <Checkbox :label="item">
              <span>{{ item }}</span>
            </Checkbox>
          </DropdownItem>
        </Checkbox-group>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import screenfull from 'screenfull'
export default {
  name: 'TableOperations',
  props: {
    vueName: {
      type: String,
      default() {
        return ''
      }
    },
    dropdownData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isScreenfull: false,
      visible: false
    }
  },
  computed: {
    ...mapGetters(['getTableSelectColumns']),
    checkboxData: {
      // 改变和存储用户设置要展示的列
      get() {
        return this.getTableSelectColumns(this.vueName)
      },
      set(val) {
        if (this.$store.state.settings.fixTableColumns) {
          const fixColumns = []
          this.dropdownData.forEach((col) => {
            val.forEach((newCol) => {
              if (newCol === col) fixColumns.push(newCol)
            })
          })
          this.changeTableColumns({ key: this.vueName, arr: fixColumns })
        } else this.changeTableColumns({ key: this.vueName, arr: val })
      }
    }
  },
  mounted() {
    screenfull.on('change', (data) => {
      this.isScreenfull = !this.isScreenfull
      this.$emit('screenfull-change', data)
    })
  },
  methods: {
    ...mapActions(['changeTableColumns']),
    clickoutside() {
      this.visible = false
    },
    fullscreen() {
      // TODO:全屏需要做不同浏览器适配
      const element = document.getElementsByClassName('app-main')[0]
      if (this.isScreenfull) screenfull.exit()
      else screenfull.request(element)
    },
    refreshTable() {
      this.$emit('refresh-table')
    }
  }
}
</script>

<style lang="less" scoped>
@l-table: l-table;
.@{l-table}-operation {
  flex: 0 0 auto;
  text-align: right;
  .@{l-table}-dropdown {
    text-align: left;
  }
}
.@{l-table}-tooltip {
  margin-left: 15px;
}
</style>
