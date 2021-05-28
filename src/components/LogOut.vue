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
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const username = computed(() => store.getters.getUser);

    const response = axios.get('http://localhost:3000', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log(response);

    function logOut() {
      router.push({ name: 'login', path: '/login' });
    }
    return {
      store,
      username,
      router,
      route,
      logOut,
    };
  },
};
</script>

<style lang="scss" scoped></style>
