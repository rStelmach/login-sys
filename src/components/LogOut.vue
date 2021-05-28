<template>
  <div class="container">
    <h1 class="display-3 text-white pt-5 fw-bold text-center">Hello {{ username }} !</h1>
    <button
      type="button"
      class="btn btn-outline-light fw-bolder text-capitalize  btn-lg d-block col-2 m-5 mx-auto "
      @click="logOut"
    >
      logout
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const username = ref('Szotu');
    const router = useRouter();
    const route = useRoute();
    function logOut() {
      router.push({ name: 'login', path: '/login' });
    }
    return {
      username,
      router,
      route,
      logOut,
    };
  },
};
</script>

<style lang="scss" scoped></style>
