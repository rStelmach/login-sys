<template>
  <div class="container">
    <header>Witam</header>
    <LogInForm />
  </div>
</template>

<script>
import LogInForm from './components/LogInForm.vue';

export default {
  components: { LogInForm },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  min-width: 100vw;
  background-image: linear-gradient(to bottom right, #05d2d5, #fd2dd2);
}
</style>
