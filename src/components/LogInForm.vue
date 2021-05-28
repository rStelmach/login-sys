<template>
  <div class="container d-flex flex-column justify-content-center align-items-center ">
    <div class="   w-25 d-flex flex-column bg-white rounded shadow p-3 mb-5 bg-white rounded">
      <h1 class=" m-4  text-center text-uppercase">sign in</h1>
      <form class=" form-container  mx-5 mt-4 d-flex flex-column" @submit.prevent="submitForm">
        <div class="form-group mb-4">
          <label for="usernameInput " class="form-label fw-bolder text-capitalize">username </label>
          <input
            type="username"
            class="form-control"
            :class="{ 'is-invalid': !username.isValid || !isCorrect }"
            id="usernameInput"
            placeholder="Your Username"
            v-model.trim="username.value"
            @blur="clearValidity('username')"
          />
          <div :class="{ 'invalid-feedback': !username.isValid }" v-if="!username.isValid">
            Please enter a username
          </div>
          <div :class="{ 'invalid-feedback': !isCorrect }" v-if="!isCorrect"></div>
        </div>
        <div class="form-group mb-4">
          <label for="passwordInput" class="form-label fw-bolder text-capitalize">password</label>
          <input
            type="password"
            class="form-control "
            :class="{ 'is-invalid': !isCorrect }"
            id="passwordInput"
            placeholder="Your Password"
            v-model="password.value"
            @blur="clearValidity('password')"
          />
          <div :class="{ 'invalid-feedback': !isCorrect }" v-if="!isCorrect">
            Invalid Username or password
          </div>
        </div>
        <button type="submit" class=" btn  mt-5 mb-3 btn-secondary text-uppercase border-0 rounded-20 fw-bold">
          login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
// import axios from 'axios';

export default {
  setup() {
    const username = reactive({ value: '', isValid: true });
    const password = reactive({ value: '', isValid: true });
    const formIsValid = ref(true);
    const isCorrect = ref(true);
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    function clearValidity(input) {
      this[input].isValid = true;
    }
    function validateForm() {
      formIsValid.value = true;
      if (username.value === '') {
        username.isValid = false;
        formIsValid.value = false;
      }
      if (password.value === '') {
        password.isValid = false;
        formIsValid.value = false;
      }
    }

    async function submitForm() {
      validateForm();
      if (!formIsValid.value) {
        return;
      }
      try {
        await store.dispatch('auth', {
          username: username.value,
          password: password.value,
        });
        router.replace({ name: 'logged', path: '/logged ' });
      } catch {
        isCorrect.value = false;
      }
    }
    return {
      username,
      password,
      clearValidity,
      formIsValid,
      isCorrect,
      validateForm,
      submitForm,
      router,
      route,
      store,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  .box {
    width: 25vw;
    button {
      transition: 0.1s;
      letter-spacing: 0.15rem;
    }
    button:hover {
      transform: scale(1.01);
    }
  }
}
</style>
