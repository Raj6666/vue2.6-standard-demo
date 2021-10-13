<template>
  <div class="home">
    <p class="title">HelloWorld</p>
    <button @click="getHomeData()">请求首页数据</button>
    <button @click="updateHomeData()">更新首页数据</button><br/>
    <button @click="getUserData()">请求用户数据</button>
    <img alt="Vue logo" src="../assets/images/logo.png" />
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import Api from '@/apis/index.js'
import HelloWorld from "@components/common/HelloWorld"

export default {
  name: "Home",
  components: {
  },
  methods: {
    async getHomeData () {
      const result = await Api.home.getHomeList({name: '测试'})
      console.log(result)
    },
    async updateHomeData () {
      const result = await Api.home.updateHomeList({name: '测试'})
      console.log(result)
    },
    async getUserData () {
      const result = await Api.userModule.getUser({name: '测试'})
      console.log(result)
    }
  }
};
</script>

<style lang="scss" scoped>
  .title{
    color: red;
    @include transform-centering;
  }
</style>

