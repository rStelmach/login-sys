<template>
  <div class="container">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('autoLogIn');
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  min-width: 100vw;
  background-image: linear-gradient(to bottom right, #05d2d5, #fd2dd2);
}
</style>
