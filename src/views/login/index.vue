<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-06 15:09:08
 * @Description: 登陆页面
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-16 15:49:35
-->
<template>
  <div class="i-login">
    <Layout class="i-login-layout">
      <Header class="i-login-layout-header">Vue-iview-admin管理系统</Header>
      <Content class="i-login-layout-content">
        <components :is="boxPosition" :auto-options="autoOptions" @landing="login" />
      </Content>
      <Footer class="i-login-layout-footer">
        <RadioGroup v-model="boxPosition" type="button" button-style="solid" class="i-login-choose">
          <Radio label="LeftContent">左</Radio>
          <Radio label="CenterContent">中</Radio>
          <Radio label="RightContent">右</Radio>
        </RadioGroup>
      </Footer>
    </Layout>
  </div>
</template>

<script>
import CenterContent from './components/LoginCenter.vue'
import LeftContent from './components/LoginLeft.vue'
import RightContent from './components/LoginRight.vue'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  components: { CenterContent, LeftContent, RightContent },
  data() {
    return {
      boxPosition: 'CenterContent',
      autoOptions: []
    }
  },
  mounted() {
    this.$utils.selectLStorage('autoOptions') ? (this.autoOptions = this.$utils.getLStorage('autoOptions')) : this.$utils.setLStorage('autoOptions', [])
  },
  methods: {
    ...mapActions(['setToken', 'generateRoutes', 'setFrontNames', 'setBackNames', 'setChildViewSettings']),
    login(data) {
      const { account, password } = data
      if (account === 'admin' && password === '2580') {
        if (!this.autoOptions.indexOf(account)) this.autoOptions.push(account)
        this.setToken('admin2580')
        this.$utils.setLStorage('token', 'admin2580')
        this.$utils.setLStorage('autoOptions', this.autoOptions)
        // TODO 下面代码要加到登陆和切换角色处
        const frontNames = ['Home', 'FileReceive', 'Test1', 'Test2', 'Table']
        const backNames = []
        const childViewSettings = [
          { pagename: 'Home', pageShow: true, addPower: false, deletePower: false, checkPower: false, editPower: false },
          { pagename: 'FileReceive', pageShow: true, addPower: false, deletePower: false, checkPower: false, editPower: false },
          { pagename: 'Test1', pageShow: true, addPower: false, deletePower: false, checkPower: false, editPower: false },
          {
            pagename: 'Test2',
            pageShow: true,
            childPage: [
              { pagename: 'ChildPage1', pageShow: true, addPower: false, deletePower: false, checkPower: false, editPower: false },
              { pagename: 'ChildPage2', pageShow: true, addPower: false, deletePower: false, checkPower: false, editPower: false },
              { pagename: 'ChildPage3', pageShow: true, addPower: false, deletePower: false, checkPower: false, editPower: false }
            ]
          }
        ]
        this.setChildViewSettings(childViewSettings)
        if (!frontNames.length && !backNames.length) this.$Message.error('您没有权限进入系统')
        else if (frontNames.length && backNames.length) {
          this.setFrontNames(frontNames)
            .then((names) => {
              this.generateRoutes({ type: 'front', names })
            })
            .then(() => {
              this.setBackNames(backNames)
            })
            .then((names) => {
              this.generateRoutes({ type: 'back', names })
            })
            .then(() => {
              this.$router.push({ path: '/front/home' })
            })
        } else if (frontNames.length && !backNames.length) {
          this.setFrontNames(frontNames)
            .then((names) => {
              this.generateRoutes({ type: 'front', names })
            })
            .then(() => {
              this.$router.push({ name: 'Home' })
            })
        } else {
          this.setBackNames(backNames)
            .then((names) => {
              this.generateRoutes({ type: 'back', names })
            })
            .then(() => {
              this.$router.push({ path: '/back' })
            })
        }
      } else this.$Message.error('账号密码错误！')
    }
  }
}
</script>

<style lang="less" scoped>
.i-login {
  width: 100%;
  height: 100vh;
  &-layout {
    width: 100%;
    height: 100vh;
    background: url('./images/login-bg1.jpg') no-repeat;
    &-header {
      background: rgba(#f5f7f9, 0);
      color: white;
      font-size: 18px;
      font-weight: bold;
    }
    &-content {
      position: relative;
    }
    &-footer {
      background: rgba(#f5f7f9, 0);
      text-align: right;
      .i-login-choose {
        width: auto;
        & > label {
          background: rgba(#f5f7f9, 0.2);
        }
      }
    }
  }
}
</style>
