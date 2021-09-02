<!--
 * @Autor: 刘轩亨
 * @Date: 2021-08-30 10:35:41
 * @Description: 刷新时所使用的中间空白页
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-08-30 11:31:41
-->
<template>
  <div>Waiting</div>
</template>
<script>
export default {
  name: 'Blank',
  data() {
    return {
      flag: true
    }
  },
  created() {
    if (this.flag) this.flag = false
    this.returnPage()
  },
  activated() {
    // 当前路由激活时触发
    if (!this.flag) {
      // 如果是第一次进入此界面，也会执行created路由，顾需判断
      this.flag = true
      return
    }
    this.returnPage()
  },
  methods: {
    returnPage() {
      const url = this.$route.query
      let str = ''
      for (const i in url) {
        str += url[i]
      }
      // let formName = str.split('/')[1]
      // formName = formName.charAt(0).toUpperCase() + formName.slice(1)
      // let newKeepAlive = []
      // for (let i in this.keepAlive) {
      //   const item = this.keepAlive[i]
      //   if (item != fromName) {
      //     newKeepAlive.push(item)
      //   }
      // }
      // this.$store.dispatch('changeKeepAlive', newKeepAlive)
      // 清除上个界面的keepAlive缓存
      setTimeout(() => {
        // 时间不要设置过长
        this.$router.push({
          path: str
        })
      }, 10)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
