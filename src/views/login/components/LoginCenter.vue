<!--
 * @Autor: 刘轩亨
 * @Date: 2021-09-09 14:50:24
 * @Description: 登陆中间位置的登陆选项
 * @Version: 1.0
 * @LastEditors: 刘轩亨
 * @LastEditTime: 2021-09-10 10:22:39
-->
<template>
  <div class="content">
    <aside class="content-aside"></aside>
    <article class="content-article">
      <h1 class="content-article-title">登陆</h1>
      <section class="content-article-section">
        <Icon class="content-article-icon" type="md-planet" />
        <AutoComplete
          v-model="account"
          :data="autoOptions"
          class="content-article-auto"
          placeholder="账号"
          :clearable="true"
        />
      </section>
      <section class="content-article-section">
        <Icon class="content-article-icon" type="md-finger-print" />
        <Input
          v-model="password"
          class="content-article-input"
          type="password"
          password
          placeholder="密码"
        />
      </section>
      <Button type="default" long class="content-article-button" @click="landing">登陆</Button>
    </article>
  </div>
</template>

<script>
export default {
  name: 'LoginCenter',
  props: {
    autoOptions: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    landing() {
      this.$emit('landing', { account: this.account, password: this.password })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: row;
  width: 40%;
  height: 50%;
  position: relative;
  top: 25%;
  left: 30%;
  &-aside {
    width: 35%;
    padding: 12px;
    box-shadow: 2px 0 4px rgba(#fff, 0.6);
    border-radius: 12px 0 0 12px;
    background: rgba(#f5f7f9, 0.3);
  }
  &-article {
    width: 65%;
    padding: 12px;
    border-radius: 0 12px 12px 0;
    background: rgba(#f5f7f9, 0.3);

    &-title {
      text-align: center;
      color: #d58057;
    }
    &-section {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-top: 48px;
    }
    &-icon {
      font-size: 22px;
      padding: 0 20px;
      color: #9a6d4e;
    }
    &-button {
      background: transparent;
      border: 0;
      box-shadow: 0 0 5px rgba(#fff, 1);
      margin-top: 48px;
      letter-spacing: 12px;
      color: #724e38;
    }
  }
}
</style>
<style lang='less'>
.content-article-auto,
.content-article-input {
  .ivu-input {
    background: transparent;
    border: 0;
    border-bottom: 2px solid #f5f7f9;
    border-radius: 0;
    box-shadow: 0;
    padding: 0 12px;
    font-size: 18px;
    &-suffix i {
      color: #515a6e;
      font-size: 18px;
    }
    &::-webkit-input-placeholder {
      color: rgba(#515a6e, 0.5);
    }
    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: rgba(#515a6e, 0.5);
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: rgba(#515a6e, 0.5);
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: rgba(#515a6e, 0.5);
    }
  }
  .ivu-icon {
    color: #515a6e;
    font-size: 18px;
  }
}
</style>
