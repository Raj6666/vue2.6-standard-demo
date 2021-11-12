<template>
  <div class="error-content">
    <p>{{ errorContent }}</p>
    <div @click="returnHome" class="return-button">返回首页</div>
  </div>
</template>

<script>
export default {
  name: 'StatusError',
  data() {
    return {
      errorContent: '',
    };
  },
  mounted() {
    this.errorContent = this.$route.query.content ? this.$route.query.content : 'opps,页面找不到了';
  },
  methods: {
    // 返回首页
    returnHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.error-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 25px;
  color: #ffffff;
  background: rgb(49, 33, 33);
  flex-direction: column;
  .return-button {
    border: 1px solid #ffffff;
    border-radius: 5px;
    padding: 5px;
    font-size: 20px;
    background: #4b4b6b;
    cursor: pointer;
  }
}
</style>
