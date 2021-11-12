<template>
  <div>
    个人中心
    <div id="nav">
      <router-link to="/user/tradeManagement/orders">我的订单</router-link> |
      <router-link to="/user/tradeManagement/records">交易记录</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'userHome',
};
</script>
