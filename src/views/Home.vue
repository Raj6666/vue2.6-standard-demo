<template>
  <div class="home">
    <p class="title">HelloWorld</p>
    <button @click="getHomeData()">请求首页数据</button>
    <button @click="updateHomeData()">更新首页数据</button><br />
    <button @click="getUserData()">请求用户数据</button>
    <img alt="Vue logo" src="../assets/images/logo.png" />
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  methods: {
    async getHomeData() {
      const result = await this.Api.home.getHomeList({name: '测试'});
      console.log(result);
    },
    async updateHomeData() {
      const result = await this.Api.home.updateHomeList({name: '测试'});
      console.log(result);
    },
    async getUserData() {
      const result = await this.Api.userModule.getUser({name: '测试'});
      console.log(result);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: red;
  @include transform-centering;
}
</style>
